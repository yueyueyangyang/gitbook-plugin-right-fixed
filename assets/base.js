// 或，如果习惯jquery操作，可以引入jquery
require(['gitbook', 'jquery'], function(gitbook, $) {
    gitbook.events.on('page.change', function(e, config) {
        var $div = $('<div />').appendTo('body');
        $div.attr('id','right-fixed-box');
        $div.addClass('right-fixed-box')
        let str = `<div class="right-fixed-box-btn">
                        <div class="right-fixed-box-firstBtn"><i class="iconfont">&#xec35;</i>文档反馈</div>
                        <div></div>
                   </div>`
        $div.html(str)

        $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        $(window).resize( function  () {
            $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        })
        $(document).on("click", ".right-fixed-box-firstBtn", function () {
            console.log(123)
            console.log('文档反馈')
            var $dialogBox = $('<div />').appendTo('body');
            $dialogBox.html('弹出窗')
        });
    });
});
