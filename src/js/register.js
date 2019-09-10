!function ($) {
    class formcheck {
        constructor() {
            this.username = $('#username');
            this.password = $('#password');
            this.passRepeat = $('#password-repeat');
            this.phonenum = $('#phonenum');
            this.code = $('#code');
            this.usernamespan = $('#usernamespan');
            this.passwordspan = $('#passwordspan');
            this.passRepeatspan = $('#passRepeatspan');
            this.phonenumspan = $('#phonenumspan');
            this.codespan = $('#codespan');
            this.form = $('#form');
            this.usernameflag = true;
            this.passwordflag = true;
            this.passRepeatflag = true;
            this.phonenumflag = true;
            this.codeflag = true;
            this.userreg1 = /^[\u4e00-\u9fff\w]{4,16}$/;
            this.userreg2 = /^\d+$/;
            this.passreg = /^[a-zA-Z0-9_]{6,20}$/;
        }
        init() {
            let _this = this
            this.username.on('blur', function () {
                _this.username1();
            })
            this.password.on('blur', function () {
                console.log(_this.password.val())
                _this.password1();
            })
            this.passRepeat.on('blur', function () {
                _this.passRepeat1();
            })
            this.phonenum.on('blur', function () {
                _this.phonenum1();
            })
            this.code.on('blur', function () {
                _this.code1();
            })
            this.form.on('submit', function () {
                if (_this.usernameflag || _this.passwordflag || _this.passRepeatflag || _this.phonenumflag || _this.codeflag) {
                    return false;
                }
            });
            $('.codei').on('click', function () {
                let code = parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10) + '' + parseInt(Math.random() * 10);
                $(this).html(code)
            })
        }
        username1() {
            let _this=this;
            if (this.userreg1.test(this.username.val())) {
                if (this.userreg2.test(this.username.val())) {
                    this.usernamespan.html('用户名可使用字母、汉字、数字、下划线或其组合，4～20个字符，且不能为纯数字').css({
                        color: '#d10000',
                        border: '1px solid #ffe4e4',
                        background: '#fff3f3',
                        opacity: '1'
                    });
                } else {
                    this.usernamespan.html('√').css({
                        color: 'green',
                        border: '0',
                        background: '#fff',
                        opacity: '1'
                    })
                    this.usernameflag = false;
                }
            }
            else {
                this.usernamespan.html('用户名可使用字母、汉字、数字、下划线或其组合，4～20个字符，且不能为纯数字').css({
                    color: '#d10000',
                    border: '1px solid #ffe4e4',
                    background: '#fff3f3',
                    opacity: '1'
                });
            }
            $.ajax({
                url:'http://10.31.157.27/html5-1907-js/meilele/php/register.php',
                data:{
                    checkname:this.username.val()
                }
            }).done(function(d){
                if(d){
                    _this.usernamespan.html('用户名已存在').css({
                        color: '#d10000',
                        border: '1px solid #ffe4e4',
                        background: '#fff3f3',
                        opacity: '1'
                    });
                    _this.usernameflag = true;
                }
            })
        }
        password1() {
            if (this.passreg.test(this.password.val())) {
                if (/^\d+$/.test(this.password.val()) || /^[a-zA-Z]+$/.test(this.password.val()) || /^[_+]$/.test(this.password.val())) {
                    this.passwordspan.html('6-20位，支持字母、数字或_的组合，不可单独使用字母、数字或_').css({
                        color: '#d10000',
                        border: '1px solid #ffe4e4',
                        background: '#fff3f3',
                        opacity: '1'
                    });
                } else {
                    this.passwordspan.html('√').css({
                        color: 'green',
                        border: '0',
                        background: '#fff',
                        opacity: '1'
                    })
                    this.passwordflag = false;
                }
            }
            else {
                this.passwordspan.html('6-20位，支持字母、数字或_的组合，不可单独使用字母、数字或_')
                this.passwordspan.css({
                    color: '#d10000',
                    border: '1px solid #ffe4e4',
                    background: '#fff3f3',
                    opacity: '1'
                });
            }
            if (this.passRepeat.val() !== '') {
                if (this.passRepeat.val() !== this.password.val()) {
                    this.passRepeatspan.html('重复密码不正确').css({
                        color: '#d10000',
                        border: '1px solid #ffe4e4',
                        background: '#fff3f3',
                        opacity: '1'
                    })
                }
                else {
                    this.passRepeatspan.html('√').css({
                        color: 'green',
                        border: '0',
                        background: '#fff',
                        opacity: '1'
                    })
                }
            }
        }
        passRepeat1() {
            if (this.passRepeat.val() !== '') {
                if (this.passRepeat.val() == this.password.val() && this.passreg.test(this.passRepeat.val())) {
                    this.passRepeatspan.html('√').css({
                        color: 'green',
                        border: '0',
                        background: '#fff',
                        opacity: '1'
                    })
                    this.passRepeatflag = false;
                } else {
                    this.passRepeatspan.html('重复密码不正确').css({
                        color: '#d10000',
                        border: '1px solid #ffe4e4',
                        background: '#fff3f3',
                        opacity: '1'
                    })
                }
            } else {
                this.passRepeatspan.html('重复密码不能为空').css({
                    color: '#d10000',
                    border: '1px solid #ffe4e4',
                    background: '#fff3f3',
                    opacity: '1'
                })
            }

        }
        phonenum1() {
            if (/^1[3|5|7|8]\d{9}$/.test(this.phonenum.val())) {
                this.phonenumspan.html('√').css({
                    color: 'green',
                    border: '0',
                    background: '#fff',
                    opacity: '1'
                })
                this.phonenumflag = false;
            }
            else {
                this.phonenumspan.html('请输入正确的手机号码').css({
                    color: '#d10000',
                    border: '1px solid #ffe4e4',
                    background: '#fff3f3',
                    opacity: '1'
                });
            }
        }
        code1() {
            if (this.code.val() == $('.codei').html()) {
                this.codespan.html('√').css({
                    color: 'green',
                    border: '0',
                    background: '#fff',
                    opacity: '1'
                })
                this.codeflag = false;
            }
            else {
                this.codespan.html('验证码不正确').css({
                    color: '#d10000',
                    border: '1px solid #ffe4e4',
                    background: '#fff3f3',
                    opacity: '1'
                });
            }

        }
    }
    new formcheck().init();
}(jQuery);