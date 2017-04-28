export default {

    /**
     * TODO: have to be fixed with check all variants
     * @returns {boolean|*}
     */
    go: function (path) {
        if (typeof window.f7 !== 'undefined') {
            f7.mainView.router.loadPage(path);
        } else {

            var intrl = setInterval(function () {
                if (typeof window.f7 !== 'undefined') {
                    f7.mainView.router.loadPage(path);

                    clearInterval(intrl);
                }
            }, 5);
        }
    },

    loaded: function (callback) {
        var intrl = setInterval(function () {
            if (typeof window.f7 !== 'undefined') {
                callback(f7.mainView.router);

                clearInterval(intrl);
            }
        }, 5);
    }
}