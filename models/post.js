const Sequelize = require('sequelize');

/*
 * posts 테이블
 * id: 게시글 고유 식별 번호 Primary Key, auto_increment
 * post_title: 게시글 제목
 * post_content: 게시글 내용
 * create_at: 게시글 작성일
 * update_at: 게시글 수정일
 * post_writer: 게시글 작성자. users테이블의 user_nick참조
 */
module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            post_title: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            post_content: {
                type: Sequelize.STRING(500),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'post_writer', targetKey: 'user_nick' });
    }
}