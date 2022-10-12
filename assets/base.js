// 或，如果习惯jquery操作，可以引入jquery
require(['gitbook', 'jquery'], function(gitbook, $) {
    gitbook.events.on('page.change', function(e, config) {
        var $div = $('<div />').appendTo('body');
        $div.attr('id','holdy');
        $('#holdy').innnerHTML('一个按钮')
    });
});
