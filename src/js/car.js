!function ($) {
    class cart {
        constructor() {
            this.noGoods = $('.no-goods');
            this.goodsbox = $('.goods-box');
            this.box = $('.goods-item:hidden');
            this.boxParent = $('.item-list');
            this.sidarr = [];
            this.numarr = [];
            this.allprice = 0;
            this.allnum = 0;
            this.num = 0;
        }
        init() {
            let _this = this;
            this.display();
            if (this.getcookie('cookiesid') && this.getcookie('cookienum')) {
                this.sidarr = this.getcookie('cookiesid').split(',');
                this.numarr = this.getcookie('cookienum').split(',');
                $.each(this.sidarr, function (index, value) {
                    _this.showgoodslist(_this.sidarr[index], _this.numarr[index]);
                })
            }
            this.delete();
            $('.quantity-down').on('click', function () {
                let num = $(this).parents('.quantity-form').find('input').val();
                num--
                if (num < 1) {
                    num = 1;
                }
                $(this).parents('.quantity-form').find('input').val(num);
                let $sid = $(this).parents('.quantity-form').attr('sid');
                let $index = $.inArray($sid, _this.sidarr);
                _this.numarr[$index]--
                _this.addcookie('cookienum', _this.numarr, 20);
                let $price = $(this).parents('.goods-item').find('.b-price strong').html();
                let $allprice = num * $price
                $(this).parents('.goods-item').find('.b-sum strong').html($allprice);
                _this.sum();
                $('.goodsnum').on('blur',function(){
                    _this.sum();
                })
            })
            $('.quantity-add').on('click', function () {
                let num = $(this).parents('.quantity-form').find('input').val();
                num++;
                $(this).parents('.quantity-form').find('input').val(num);
                let $sid = $(this).parents('.quantity-form').attr('sid');
                let $index = $.inArray($sid, _this.sidarr);
                _this.numarr[$index]++
                _this.addcookie('cookienum', _this.numarr, 20);
                let $price = $(this).parents('.goods-item').find('.b-price strong').html();
                let $allprice = num * $price
                $(this).parents('.goods-item').find('.b-sum strong').html($allprice);
                _this.sum();
            })
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
        //添加cookie
        addcookie(key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        }
        //删除cookie
        delcookie(key) {
            this.addcookie(key, '', -1);
        }
        //显示影藏
        display() {
            if (this.getcookie('cookiesid') && this.getcookie('cookienum')) {
                this.noGoods.css('display', 'none');
                this.goodsbox.css('display', 'block');
            }
            else {
                this.noGoods.css('display', 'block');
                this.goodsbox.css('display', 'none');
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
                        let clonebox = _this.box.clone(true, true);
                        clonebox.css('display', 'block');
                        clonebox.find('.goods-pic img').attr('src', value.url);
                        clonebox.find('.quantity-form').attr('sid', value.sid);
                        clonebox.find('.goods-d-info a').html(value.title);
                        clonebox.find('.b-price strong').html(value.price);
                        clonebox.find('.b-quantity input').val(parseInt(num));
                        clonebox.find('.b-sum strong').html(value.price * num);
                        _this.boxParent.append(clonebox);
                    }
                })
                _this.sum();
                _this.allElection();

            })
        }
        //计算总价和数量
        sum() {
            let allprice = 0;
            let allnum = 0;
            let _this = this;
            $('.goods-item:visible').each(function (index, element) {
                if ($(element).find('.cart-checkbox').find('input').is(':checked')) {
                    allprice += parseInt($(element).find('.b-sum').find('strong').html())
                    allnum += parseInt($(element).find('.quantity-form').find('input').val())
                }
            })
            $('.price-sum .totalprice').html('￥' + allprice);
            $('.amount-sum em').html(allnum);
        }
        //删除商品
        delete() {
            let _this = this;
            $('.delete-good').on('click', function () {
                let $sid = $(this).parents('.goods-item').find('.goods-pic img').attr('sid');
                let $index = $.inArray($sid, _this.sidarr);
                if (confirm('你确定要删除吗？')) {
                    _this.sidarr.splice($index, 1);
                    _this.numarr.splice($index, 1);
                    _this.addcookie('cookiesid', _this.sidarr, 20)
                    _this.addcookie('cookienum', _this.numarr, 20)
                    $(this).parents('.goods-item').remove()
                }
                _this.sum();
                _this.display();
            })
            $('.alldelete').on('click', function () {
                if (confirm('你确定要删除吗？')) {
                    $('.goods-item:visible').find('.cart-checkbox').find('input:checked').parents('.goods-item:visible').remove();
                    _this.delcookie('cookiesid')
                    _this.delcookie('cookienum')
                    _this.sum();
                }
                _this.display()
            })
                ;
        }
        //全选
        allElection() {
            let _this = this;
            $('.allsel').on('click', function () {
                $('.allsel').prop('checked', $(this).prop('checked'))
                $('.goods-item:visible').find('.cart-checkbox').find('input').prop('checked', $(this).prop('checked'))
                _this.sum()
            })
            this.boxParent.on('click', 'input:checkbox', function () {
                if ($('.goods-item:visible').find('.cart-checkbox').find('input').length == $('.goods-item:visible').find('.cart-checkbox').find('input:checked').length) {
                    $('.allsel').prop('checked', true)
                } else {
                    $('.allsel').prop('checked', false)
                }
                _this.sum()
            })
        }
    }

    new cart().init();
}(jQuery)