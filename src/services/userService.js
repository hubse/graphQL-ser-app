import { users,user_Modules } from "../db/mockDb.js";


class UserService {

  static getAllUsers() {

    // return users;

     return users.map((user) => ({
      ...user,

      modules: user_Modules.filter(
        (m) => m.userId === user.userId
      )
    }));
  }

  static getUserById(userId) {
    
    // return users.find(
    //   (u) => u.userId === String(userId)
    // );

      const user = users.find(
      (u) => u.userId === String(userId)
    );

    if (!user) return null;

    return {
      ...user,

      modules: user_Modules.filter(
        (m) => m.userId === user.userId
      )
    };
  }
}

export default UserService;

/*import { query } from "../db/index.js";

class UserService {
  static async getUserById(userId) {
    const sql = `
      SELECT USER_ID, USER_NAME, GROUP_CD
      FROM USER_TL
      WHERE USER_ID = ?
    `;

    const result = await query(sql, [userId]);
    return result[0];
  }

  static async getAllUsers() {
    const sql = `
      SELECT USER_ID, USER_NAME, GROUP_CD
      FROM USER_TL
    `;

    return await query(sql);
  }
}

export default UserService;*/