//悬浮导航
!function ($) {
    class suspension {
        constructor() {
            this.search = $('.search-fixed');
        }
        init() {
            let _this = this
            $(window).on('scroll', function () {
                var $top = $(window).scrollTop();
                if ($top >= 700) {
                    _this.search.stop(true).animate({
                        top: 0
                    });
                } else {
                    _this.search.stop(true).animate({
                        top: -54
                    });
                }
            })

        }
    }
    new suspension().init();
}(jQuery);


// 二级导航
!function ($) {
    class subnav {
        constructor() {
            this.navLi = $('.cat-item');
            this.subbox = $('.cat-item>.sub-cat')
        }
        init() {
            let _this = this
            this.navLi.hover(function () {
                _this.subbox.eq($(this).index()).css('display', 'block').stop(true).animate({
                    opacity: 1,
                    paddingLeft: 20
                })
            }, function () {
                _this.subbox.eq($(this).index()).css('display', 'none').stop(true).animate({
                    opacity: 0,
                    paddingLeft: 10
                })
            })
        }
    }
    new subnav().init();

}(jQuery);
// 轮播图
!function ($) {
    class banner {
        constructor() {
            this.bannerBox = $('.banner-bar')
            this.oLi = $('.banner-box li');
            this.oImg = $('.banner-bar ul li div ');
            this.oSpan = $('.banner-box ol li span');
            this.oBox = $('.banner-bar ul li');
            this.previndex = 0;
            this.num = 0;
            this.timer = null;
        }
        init() {
            let _this = this
            this.oLi.hover(function () {
                _this.num = $(this).index();
                if (_this.previndex != _this.num) {
                    _this.show();
                }
            })
            this.bannerBox.hover(function () { clearInterval(_this.timer) }, function () {
                _this.timer = setInterval(function () {
                    _this.time();
                }, 3000)
            });
            this.timer = setInterval(function () {
                _this.time();
            }, 3000)
        }
        time() {
            this.num++
            if (this.num >= this.oLi.length) {
                this.num = 0;
            }
            this.show();
        }
        show() {
            this.oSpan.eq(this.previndex).css('background', '#fff');
            this.oSpan.eq(this.num).css('background', '#333');
            this.oBox.eq(this.num).stop(true).fadeIn().siblings('.banner-bar ul li').fadeOut();
            this.oImg.eq(this.num).css('left', '-20px').stop(true).animate({ left: 0 }, 1500)
            this.previndex = this.num;
        }
    }
    new banner().init();

}(jQuery);

// 数据渲染
!function ($) {
    class goods {
        constructor() {
            this.oUl = $('.rendering')
            this.shoppingCart = $('.shopping-cart');
            this.goodsBox = $('.goods-pbox');
            this.shoppingCart = $('.shopping-cart');
            this.html = '';
            this.hlm = '';
            this.numarr = [];
            this.sidarr = [];
            this.numarry = [];
        }
        init() {
            let _this = this;
            this.displayuser();
            this.display();
            $.ajax({
                url: 'http://10.31.157.27/html5-1907-js/meilele/php/meileledata.php',
                dataType: 'json'
            }).done(function (data) {
                $.each(data, function (index, value) {
                    _this.html += `
                <li>
                <div><a href="details.html?sid=${value.sid}" target="_blank"><img
                data-original="${value.url}"
                            alt="" class="lazy"></a></div>
                <p class='title'><a href="">${value.title}</a></p>
                <p class="price">￥${value.price}</p>
               </li>
                `;
                })
                _this.oUl.html(_this.html);
                $(function () {
                    $("img.lazy").lazyload();
                });
                _this.statistics();

            })

            if (_this.getcookie('cookiesid') && _this.getcookie('cookienum')) {
                _this.sidarr = _this.getcookie('cookiesid').split(',');
                _this.numarr = _this.getcookie('cookienum').split(',');
                $.each(_this.sidarr, function (index, value) {
                    _this.showgoodslist(value, _this.numarr[index]);
                })
            }
        }
        // 渲染商品
        showgoodslist(sid, num) {
            let _this = this;
            $.ajax({
                url: 'http://10.31.157.27/html5-1907-js/meilele/php/meileledata.php',
                dataType: 'json'
            }).done(function (d) {
                $.each(d, function (index, value) {
                    if (value.sid == sid) {
                        _this.hlm += `
                                 <li class="clear">
                                     <div class="Left li-pic">
                                         <img src="${value.url}" alt="">
                                    </div>
                                    <div class="right good-title-box">
                                         <p>${value.title}</p>
                                         <strong class="goodprice Left">${value.price}</strong>
                                         <a href="" class="right">删除</a>
                                         <span class="goodsnum">${num}</span>
                                    </div>
                                </li>                                                     
                       `
                    }
                })
                $('.goods-list ul').html(_this.hlm);
                _this.sum();
            })
        }
        //计算总价和数量
        sum() {
            let allprice = 0;
            let allnum = 0;
            let _this = this;
            $('.goods-list ul li').each(function (index, element) {
                allnum += parseInt($(element).find('.goodsnum').html())
                allprice += parseInt($(element).find('.goodprice').html()) * allnum;
            })
            $('.allsprice strong').html('￥' + allprice);
            $('.allsprice span').html(allnum);
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
        displayuser() {
            if (localStorage.getItem('username')) {
              $('.admin').css('display','none');
              $('.login').css('display','block');
              $('.login span').html(localStorage.getItem('username'));
            }
            $('.close').on('click',function(){
                localStorage.removeItem('username');
                $('.admin').css('display','block');
              $('.login').css('display','none');
            })
        }
        //显示隐藏购物车内容
        display() {
            if (this.getcookie('cookiesid') && this.getcookie('cookienum')) {
                $('.empty').css('display', 'none');
                $('.goods-list').css('display', 'block');
            }
            else {
                $('.empty').css('display', 'block');
                $('.goods-list').css('display', 'none');
            }
        }


        statistics() {
            if (this.getcookie('cookienum')) {
                this.numarry = this.getcookie('cookienum').split(',');
                let num = 0;
                $.each(this.numarr, function (index, value) {
                    num += parseInt(value);
                })
                this.shoppingCart.html(num);
            }
        }
        getcookie(key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        }
    }
    new goods().init();
}(jQuery);
// 楼梯
!function ($) {
    class louti {
        constructor() {
            this.backTop = $('#loutinav .last');
            this.oLi = $('#loutinav li').not('.last');
            this.louti = $('#loutinav');
            this.louceng = $('#main .louceng');
        }
        init() {
            let _this = this
            this.back();
            this.position();
            this.scroll();

        }
        back() {
            this.backTop.on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                })
            })
        }
        position() {
            this.oLi.on('click', function () {
                $(this).css('background', 'red').siblings().not('.last').css('background', '#918888')
                let $top = $('.louceng').eq($(this).index()).offset().top;
                $('html,body').stop(true).animate({
                    scrollTop: $top - 20
                })
            })
        }
        scroll() {
            let _this = this;
            $(window).on('scroll', function () {
                if ($(window).scrollTop() >= 700) {
                    _this.louti.show();
                }
                else {
                    _this.louti.hide();
                }
                _this.louceng.each(function (index, element) {
                    let $loucengsTop = $(element).offset().top + $(element).height() / 4;
                    if ($loucengsTop > $(window).scrollTop()) {
                        _this.oLi.css('background', '#918888');
                        _this.oLi.eq(index).css('background', 'red');
                        return false;
                    }
                    else {
                        _this.oLi.eq(index).css('background', '#918888');
                    }
                })
            })
        }
    }
    new louti().init();
}(jQuery);
// 搜索框
!function ($) {
    class search {
        constructor() {
            this.search = $('#search-input');
            this.oUl = $('.search-tips-box');
            this.html = '';
        }
        init() {
            let _this = this
            this.search.on('input', function () {
                if (_this.search.val() !== '') {
                    $.ajax({
                        url: 'http://10.31.157.27/html5-1907-js/meilele/php/search.php',
                        dataType: 'json',
                        data: {
                            value: $(this).val()
                        }
                    }).done(function (d) {
                        let $html = '';
                        $.each(d.keywordList, function (index, value) {
                            $html += `
                              <li><a href="">${value.name}</a></li>
                              `
                        })
                        _this.oUl.html($html);
                    })
                } else {
                    _this.oUl.html('');
                }

            })

        }
    }
    new search().init();
}(jQuery);