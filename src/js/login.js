!function ($) {
    class login {
        constructor() {
            this.mobile = $('.mobile');
            this.account = $('.account');
            this.form = $('.form-box');
            this.phone = $('#phone');
            this.login = $('#login');
            this.form1 = $('.form1');
            this.form2=$('#submit')
            this.errorBox = $('.error');
            this.code = $('#code');
            this.verification = $('.sms-btn');
            this.reg = /^1[3|5|7|8]\d{9}$/;
            this.message = $('#error-message');
            this.phoneflag = false;
            this.codeflag = false;
        }
        init() {
            let _this = this
            this.mobile.on('click', function () {
                $(this).addClass('colour');
                _this.account.removeClass('colour');
                _this.form.animate({
                    left: 0
                });
            })
            this.account.on('click', function () {
                $(this).addClass('colour');
                _this.mobile.removeClass('colour');
                _this.form.animate({
                    left: -335
                });
            })
            this.form1.on('submit', function () {
                _this.phoneError();
                if (!_this.phoneflag || !_this.codeflag) {
                    return false;
                }
            })
            this.form2.on('click', function () {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.157.27/html5-1907-js/meilele/php/login.php',
                    data: {
                        user: $('#username').val(),
                        pass: $('#password').val()
                    }
                }).done(function (d) {
                    if (d) {
                        localStorage.setItem('username',$('#username').val());
                        location.href = 'index.html';
                    } else {                       
                        _this.errorBox.show()
                        _this.message.html('用户名密码错误')              
                    }
                })
            })
            this.verification.on('click', function () {
                let code = parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10);
                $(this).html(code)
            })

         }
        phoneError() {
            if (this.phone.val() !== '') {
                if (!this.reg.test(this.phone.val())) {
                    this.errorBox.show();
                    this.message.html('请输入正确的手机号码')
                }
                else {
                    this.phoneflag = true;
                    if (this.code.val() !== '') {
                        if (this.code.val() != this.verification.html()) {
                            this.errorBox.show();
                            this.message.html('请输入正确的验证码')
                        }
                        else {
                            this.errorBox.hide();
                            this.codeflag = true;
                        }
                    }
                    else {
                        this.errorBox.show();
                        this.message.html('验证码不能为空');
                    }
                }
            }
            else {
                this.errorBox.show();
                this.message.html('手机号码不能为空');
            }
        }
    }
    new login().init();
}(jQuery);