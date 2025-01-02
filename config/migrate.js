const { Umzug, SequelizeStorage } = require('umzug');
const db = require('./database'); // Your Sequelize instance

const umzugLogger = {
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug ? console.debug.bind(console) : console.log.bind(console), // Fallback if `console.debug` is unsupported
};

// Initialize Umzug for managing migrations
const umzug = new Umzug({
    migrations: {
        // Path to migration files
        glob: './migrations/*.js'
    },
    context: db.sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: db.sequelize }),
    logger: umzugLogger,
});

// Function to apply all pending migrations
async function runMigrations() {
    try {
        await umzug.up();
        console.log('All migrations applied successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error; // Fail if migrations can't be applied
    }
}

module.exports = runMigrations;
