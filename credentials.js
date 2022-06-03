const database = 'Greenstore'
module.exports = {
    cookieSecret: 'doremon',
    mongo: {
        development: {
            connectionString: `mongodb+srv://Demoon:Demoon%402Mongo@cluster0.u3cbh.mongodb.net/${database}`
        },
        production: {
            connectionString: `mongodb+srv://Demoon:Demoon%402Mongo@cluster0.u3cbh.mongodb.net/${database}?retryWrites=true&w=majority`
        }
        
    }
}