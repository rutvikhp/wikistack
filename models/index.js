let Sequelize = require('sequelize');
let db = new Sequelize('postgres://localhost:5432/wikistack',{logging : false});

let Page = db.define('PAGE', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    values: ['open', 'closed']
  },
  date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  {
  getterMethods: {
      getRoute() {
        return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: (page) => {
        if (page.title) {
          // Removes all non-alphanumeric character from title
          // And make whitespace underscore
          page.urlTitle =  page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
          // Generates random 5 letter string
          page.urlTitle = Math.random().toString(36).substring(2, 7);
        }
      }
    }
});

let User = db.define('USER',{
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
            isEmail: true
        }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User,
  db: db
};
