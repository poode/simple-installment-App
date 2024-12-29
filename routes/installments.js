const express = require('express');
const router = express.Router();
const db = require('../models/Installment');

router.get('/', async (req, res) => {
    const installments = await db.findAll({ where: { user_id: req.session.userId } });
    res.render('installments', { installments, title: 'installments' });
});

router.post('/:id/pay', async (req, res) => {
    const installment = await db.findByPk(req.params.id);
    const paymentAmount = installment.amount_to_be_paid_per_month;
    if (+installment.remaining_amount) {
        const remainingAmount = Math.max(installment.remaining_amount - paymentAmount, 0);
        await installment.update({
            months_paid: installment.months_paid + 1,
            remaining_amount: remainingAmount,
            status: !+remainingAmount ? 'inactive' : 'active'
        });
    }

    res.redirect('/installments');
});

router.get('/new', (req, res) => {
    res.render('new-installment', { title: 'New Installment' });
});

router.post('/new', async (req, res) => {
    const { deviceName, devicePrice, installmentPercentage, downPayment, phoneNumber, payerName, installmentMonths } = req.body;
    const total_payment = (devicePrice * (1 + installmentPercentage / 100)) - downPayment;
    const remaining_amount = total_payment;
    const amount_to_be_paid_per_month = total_payment / installmentMonths;

    await db.create({
        user_id: req.session.userId,
        phone_number: phoneNumber,
        payer_name: payerName,
        device_name: deviceName,
        device_price: devicePrice,
        installment_percentage: installmentPercentage,
        down_payment: downPayment,
        installment_months: installmentMonths,
        amount_to_be_paid_per_month,
        total_payment,
        remaining_amount,
    });

    res.redirect('/installments');
});

router.get('/:id/edit', async (req, res) => {
    const installment = await db.findByPk(req.params.id);
    if (installment) {
        res.render('edit-installment', { installment, title: 'Edit installment' });
    } else {
        res.status(404).send('Installment not found.');
    }
});

router.post('/:id/edit', async (req, res) => {
    const installment = await db.findByPk(req.params.id);
    if (installment) {
        const { device_name, device_price, installment_percentage, down_payment, installment_months } = req.body;
        if (!+installment.remaining_amount) {
            const total_payment = (device_price * (1 + installment_percentage / 100)) - (down_payment + (installment.total_payment - installment.remaining_amount));
            const remaining_amount = total_payment;
            const amount_to_be_paid_per_month = total_payment / installment_months;

            await installment.update({
                device_name,
                device_price,
                installment_percentage,
                down_payment,
                total_payment,
                remaining_amount,
                installment_months,
                months_paid: 0,
                amount_to_be_paid_per_month,
            });
        }

        res.redirect('/installments');
    } else {
        res.status(404).send('Installment not found.');
    }
});

module.exports = router;
