//获取数据
!function ($) {
    class getsid {
        constructor() {
            this.sid = location.search.substring(1).split('=')[1];
            this.spic = $('.spic img');
            this.title = $('.describe-box h1 a');
            this.price = $('.price strong')
            this.img = $('.imgs-box');
            this.bigimg = $('.bfang img');
            this.smallImg = $('.spic');
            this.bigfang = $('.bfang');
            this.smallfang = $('.sfang');
            this.html = '';
            this.timer = null;
        }
        init() {
            let _this = this;
            $.ajax({
                url: "http://10.31.157.27/html5-1907-js/meilele/php/details.php",
                data: {
                    sid: this.sid
                },
                dataType: 'json'
            }).done(function (d) {
                _this.spic.attr('src', d.url);
                _this.bigimg.attr('src', d.url);
                _this.spic.attr('sid', d.sid);
                _this.title.html(d.title);
                _this.price.html('￥' + d.price);
                $.each(d.urls.split(','), function (index, value) {
                    _this.html += `
                            <li><img src="${value}" alt=""></li>
                            `;
                })
                _this.img.html(_this.html);
                _this.tabimg();
            })
            this.fangda();
        }
        //切换图片
        tabimg() {
            let _this = this;
            this.img.on('mouseover', 'li', function () {
                let $this = $(this);
                $(this).attr('timer', setTimeout(function () {
                    _this.spic.attr('src', $this.find('img').attr('src'));
                    _this.bigimg.attr('src', $this.find('img').attr('src'));
                    $this.css('border', '2px solid red').siblings().css('border', '2px solid transparent');
                }, 300))
                $(this).on('mouseout', function () {
                    clearTimeout($(this).attr('timer'))
                })
            })
        }
        fangda() {
            let _this = this;
            this.smallImg.hover(function (ev) {
                _this.bigfang.show();
                _this.smallfang.show();
                $(this).on('mousemove', function (ev) {
                    _this.move(ev);
                })
            }, function () {
                _this.bigfang.hide();
                _this.smallfang.hide();
            })
            this.smallfang.css({
                width: this.bigfang.outerWidth() / this.bigimg.outerWidth() * this.smallImg.outerWidth(),
                height: this.bigfang.outerHeight() / this.bigimg.outerHeight() * this.smallImg.outerHeight()
            })

        }
        move(ev) {
            let l = ev.pageX - this.smallfang.width() / 2 - this.smallImg.offset().left;
            let t = ev.pageY - this.smallfang.height() / 2 - this.smallImg.offset().top;
            if (l <= 0) {
                l = 0
            }
            else if (l >= this.smallImg.width() - this.smallfang.width()) {
                l = this.smallImg.width() - this.smallfang.width()
            }
            if (t <= 0) {
                t = 0
            }
            else if (t >= this.smallImg.height() - this.smallfang.height()) {
                t = this.smallImg.height() - this.smallfang.height()
            }
            this.smallfang.css({
                left: l,
                top: t
            })
            this.bigimg.css({
                left: -l * this.bigimg.outerWidth() / this.bigfang.outerWidth(),
                top: -t * this.bigimg.outerHeight() / this.bigfang.outerHeight()
            })

        }
    }
    new getsid().init();
}(jQuery);
//按钮轮播小图片
!function ($) {
    class tab {
        constructor() {
            this.left = $('.lt');
            this.right = $('.rt');
            this.oUl = $('.imgs-box');
            this.box = $('.imgs');
            this.oLi = $('.imgs-box li');
            this.num = 0;
            this.imgs = 5;
        }
        init() {
            let _this = this;
            this.box.hover(function () {
                _this.left.show();
                _this.right.show();
            }, function () {
                _this.left.hide();
                _this.right.hide();
            })

            this.right.on('click', function () {
                let $len = $('.imgs-box li').length;
                let $width = $('.imgs-box li').outerWidth(true);
                _this.num++
                if (_this.num > $len - _this.imgs) {
                    _this.num = 0
                }
                _this.oUl.stop(true).animate({
                    left: -_this.num * $width
                })
            })
            this.left.on('click', function () {
                let $len = $('.imgs-box li').length;
                let $width = $('.imgs-box li').outerWidth(true);
                _this.num--
                if (_this.num < 0) {
                    _this.num = $len - _this.imgs;
                }
                _this.oUl.stop(true).animate({
                    left: -_this.num * $width
                })
            })
        }
    }
    new tab().init();
}(jQuery);
//数量加减
!function ($) {
    class tab {
        constructor() {
            this.left = $('.add');
            this.right = $('.reduce');
            this.input = $('#num');
            this.car = $('.car');
            this.spic = $('.spic img');
            this.input = $('#num');
            this.carnum = $('#carnum');
            this.shoppingCart = $('.shopping-cart');
            this.sidarr = [];
            this.numarr = [];
        }
        init() {
            let _this = this;
            this.right.on('click', function () {
                let num = _this.input.val();
                num++
                _this.input.val(num);
            })
            this.left.on('click', function () {
                let num = _this.input.val();
                num--
                if (num < 1) {
                    num = 1;
                }
                _this.input.val(num);
            })

            this.car.on('click', function () {
                _this.addcar();
            })
            this.statistics();

        }
        // 添加到购物车
        addcar() {
            this.cookieArr();
            let $sid = this.spic.attr('sid');
            if ($.inArray($sid, this.sidarr) !== -1) {
                this.numarr[$.inArray($sid, this.sidarr)] = parseInt(this.numarr[$.inArray($sid, this.sidarr)]) + parseInt(this.input.val());
                this.addcookie('cookienum', this.numarr, 20);
                this.statistics();
            } else {
                this.sidarr.push($sid);
                this.addcookie('cookiesid', this.sidarr, 20);
                this.numarr.push(this.input.val());
                this.addcookie('cookienum', this.numarr, 20);
                this.statistics();
            }
            alert('成功添加'+this.input.val()+'件商品到购物车');
        }
        //添加cookie
        addcookie(key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        }
        //取cookie
        getcookie(key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        }
        cookieArr() {
            if (this.getcookie('cookiesid') && this.getcookie('cookienum')) {
                this.sidarr = this.getcookie('cookiesid').split(',');
                this.numarr = this.getcookie('cookienum').split(',');
            } else {
                this.sidarr = [];
                this.numarr = [];
            }
        }
        statistics() {
            if (this.getcookie('cookiesid') && this.getcookie('cookienum')) {
                this.numarr = this.getcookie('cookienum').split(',');
                let num = 0;
                $.each(this.numarr, function (index, value) {
                    num += parseInt(value);
                })
                this.carnum.html(num);
                this.shoppingCart.html(num);
            } else {
                this.carnum.html('0');
                this.shoppingCart.html('0');
            }

        }
    }
    new tab().init();
}(jQuery);