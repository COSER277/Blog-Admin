/*验证token*/
class Token {
    //验证token是否合法
    async VaildToken() {
        var vaildtoken = localStorage.token;
        if (!vaildtoken) {
            return false
        }
        const res = await this.$http.post('vaildtoken', vaildtoken)
        if (res.code === 404 || res.code === 500) {
            return false
        }
        if (res.code == 200) {
            return true
        }
        return false
    }
}

module.exports = new Token();