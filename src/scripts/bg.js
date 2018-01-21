!function (c,GM) {
    /**
     * Id nhóm bạn cần quản lý
     * @type {number}
     */
    GM.group_id=5;
    /**
     * Id bài viết để log thông tin
     * @type {number}
     */
    GM.log_post_id=0;


    GM.core={
        init:function(){
            /**
             * Khi cài đặt extension
             */
            c.runtime.onInstalled.addListener(function (t) {
                if ("install" === t.reason) {
                    var n = c.runtime.getManifest().homepage_url;
                    c.tabs.create({url: n})//Mở 1 tab mới với địa chỉ home_url ở file manifest
                }
            });
            this.checkUser();
            /**
             * Bật chức năng cho admin
             */
            GM.admin.enable();
        },
        /**
         * Lấy id của user đang đăng nhập từ cookie c_user
         * Hàm này đọc lại cookie 2s 1 lần để lấy giá trị c_user lưu giữ id của user hiện tại
         */
        checkUser:function(){
            GM.c_user=0;
            var self=this;
            c.cookies.get({
                url: "https://*.facebook.com",
                name: "c_user"
            }, function (cookie) {
                cookie ? (GM.c_user=cookie.value) : GM.c_user=0;
            });
            setTimeout(function(){
                self.checkUser();
            },2000)

        }
    };
    GM.core.init();
}(chrome,GM);
