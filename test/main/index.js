var conf = require('../../nightwatch.conf');
const { email, password } = require('../context/index');

module.exports = {
    login: function (browser) {
        const auth = browser.page.auth();
        const menu = browser.page.menu();

        menu.navigate()
            .login();

        auth.login(email, password)
            .logout();
    }
};
