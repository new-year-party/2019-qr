function Service(options = {}) {
    const db = options.db;

    function updateUserProgress(user, userId) {
        const progress = Number(user.progress) + 1;
        db.updateUserProgress(userId, progress);
    }

    this.getUsersInfo = async () => {
        const result = await db.getUsersInfo();
        if (result) {
            return result;
        }
        return 9999;
    };

    this.getUserTextByHash = async (hash) => {
        const result = await db.getUserText(hash);
        if (result) {
            const userId = result.user_id;
            const user = await db.getUserByUserId(userId);
            if (user) {
                if (result.order - Number(user.progress) === 1) {
                    result.success = true;
                    // TODO:: раскоментировать перед последними тестами и выкладкой
                    //updateUserProgress(user, userId);
                    return result;
                }
                return result.order - Number(user.progress) > 0 ? 200 : 250;
            }
        }
        return 100;
    };

    (() => {})();
}

module.exports = Service;
