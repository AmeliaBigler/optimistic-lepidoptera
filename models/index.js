const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

Article.belongsTo(User, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

User.hasMany(Article, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'commenter_id',
    onDelete: 'CASCADE',
  });

Comment.belongsTo(User, {
    foreignKey: 'commenter_id',
    onDelete: 'CASCADE',
});

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Article, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Article, Comment };