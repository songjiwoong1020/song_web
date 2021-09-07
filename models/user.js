const Sequelize = require('sequelize');

/*
 * users 테이블
 * id: 회원 고유 식별 번호 Primary Key, auto_increment
 * user_email: 회원 이메일
 * user_nick: 회원 닉네임
 * user_provider: 소셜 로그인 사용처
 * user_snsid: 소셜 로그인 고유 id
 * user_created: 회원 가입일
 */
module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            user_email: {
                type: Sequelize.STRING(35),
                allowNull: false,
                unique: true
            },
            user_nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            },
            user_provider: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            user_snsid: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            user_created: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        },{
            sequelize,
            timestamps: false,//createAt, updateAt컬럼 사용여부. 생성, 수정 날짜를 자동으로 기입해줌
            underscored: true,//캐멀 캐이스를 스네이크 케이스로 바꿀지 여부
            modelName: 'User',//모델 이름 설정. 프로젝트에서 사용할 이름
            tableName: 'users',//실제 테이블 이름
            paranoid: false,//deleteAt컬럼 사용여부. 로우를 삭제하지 않고 deleteAt컬럼에 지운 시간을 기록. 조회 명령시 deleteAt컬럼이 null인 로우만 조회.
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.User.hasMany(db.Post, { foreignKey: 'post_writer', sourceKey: 'user_nick' });
    }
}