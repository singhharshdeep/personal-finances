const Item = require('../../models/Item');
const User = require('../../models/User');
const controller = require('../../api/controllers/item.controller');

describe('Item CRUD', () => {

    it('generates mock item in db', async () => {
        await Item.sync({ force: true });
        await Item.create({
            access_token: 'test_access_token',
            item_id: 'test_item_id'
        });
    });

});
