const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = db.define('page', {
    title: { 
    	type: Sequelize.STRING,
    	allowNull : false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull : false,
        get() {
        	return '/wiki/'+ this.getDataValue('urlTitle');
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull : false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE))
    }
});
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull : false
    },
    email: {
        type: Sequelize.STRING,
        allowNull : false
    }
});


Page.hook('beforeValidate', function generateUrlTitle (page) {
  if (page.title) {
   
    return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return page.urlTitle = Math.random().toString(36).substring(2, 7);
  }
})
Page.belongsTo(User, { as: 'author' });


module.exports = {
  db: db,	
  Page: Page,
  User: User
};