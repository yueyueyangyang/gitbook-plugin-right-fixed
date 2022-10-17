// 或，如果习惯jquery操作，可以引入jquery
require(['gitbook', 'jquery'], function(gitbook, $) {
    gitbook.events.on('page.change', function(e, config) {
        var $div = $('<div />').appendTo('body');
        $div.attr('id','right-fixed-box');
        $div.addClass('right-fixed-box')
        let rfHtml = `<div class="right-fixed-box-btn">
                        <div class="r-f-box-firstBtn"><i class="iconfont">&#xec35;</i>文档反馈</div>
                        <div></div>
                   </div>`
        $div.html(rfHtml)
        var api = {
            firstdialog: {
                docPath: '',
                problemTypeCode: '',
                problemContent: '',
                contactWay: '',
                fileKey: ''
            }
        }
        var $dialogBox = $('<div style="display: none" />').appendTo('body');
        $(document).on("click", ".r-f-box-firstBtn", function () {
            $dialogBox.addClass('right-fixed-firstdialog')
            let dialogHtml = `<div class="r-f-dialog-body">
                            <div class="r-f-dialog-title">
                                <div>问题反馈</div>
                                <i class="iconfont">&#xeb6a;</i>
                            </div>
                            <div class="r-f-dialog-content">
                                <div class="r-f-dialog-form">
                                    <div>
                                        <div>问题类型</div>
                                        <div class="r-f-checkbox-box">
                                            <div><input type="checkbox" name="problemType" id="r-f-d-10" value="10"><label for="r-f-d-10">错别字</label></div>
                                            <div><input type="checkbox" name="problemType" id="r-f-d-20" value="20"><label for="r-f-d-20">内容不正确</label></div>
                                            <div><input type="checkbox" name="problemType" id="r-f-d-30" value="30"><label for="r-f-d-30">描述不清楚</label></div>
                                            <div><input type="checkbox" name="problemType" id="r-f-d-40" value="40"><label for="r-f-d-40">链接有错误</label></div>
                                            <div><input type="checkbox" name="problemType" id="r-f-d-50" value="50"><label for="r-f-d-50">步骤不完整</label></div>
                                            <div><input type="checkbox" name="problemType" id="r-f-d-60" value="60"><label for="r-f-d-60">代码/图片缺失</label></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>意见反馈</div>
                                        <div>
                                            <textarea placeholder="请输入您的建议或问题" name="problemContent" cols="30" rows="5" style="resize:none;"></textarea>
                                        </div>
                                    </div>
                                    <div>
                                       <div>联系方式</div>
                                        <div>
                                            <input type="text" name="contactWay" placeholder="请留下您的域账号或手机号或邮箱地址">
                                        </div>
                                    </div>
<!--                                    <div>-->
<!--                                       <div>上传文件</div>-->
<!--                                        <div>-->
<!--                                            <input type="file" name="fileKey">-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>

                            </div>
                            <div class="r-f-dialog-footer">
                                <div class="submit">直接提交</div>
                            </div>
                       </div>`
            $dialogBox.html(dialogHtml)
            $dialogBox.css('top',  $('body').height() * .5 - $dialogBox.height() * .5).css('left',  $('body').width() * .5 - $dialogBox.width() * .5)
            $dialogBox.show()
            api.firstdialog = {
                docPath: '',
                problemTypeCode: '',
                problemContent: '',
                contactWay: '',
                fileKey: ''
            }
        });

        $(document).on("click", ".right-fixed-firstdialog .r-f-dialog-body .r-f-dialog-title i", function () {
            $dialogBox.hide()
        });

        $(document).on("click", ".right-fixed-firstdialog .r-f-dialog-body .r-f-dialog-footer .submit", function () {
            var check_value = []
            $('input[name="problemType"]:checked').each(function(){
                //将选中的值添加到数组check_value中
                check_value.push($(this).val());
            });
            if (check_value.length === 0){
                console.log('请选择您反馈问题的类型')
                return
            }

            api.firstdialog = {
                docPath: window.location.href,
                problemTypeCode: check_value.join(','),
                problemContent: $('textarea[name="problemContent"]').val(),
                contactWay: $('input[name="contactWay"]').val(),
                fileKey: ''
            }
            console.log(api)
            $.ajax({
                asycn : true,
                contentType : "application/json",
                dataType : "json",
                error : function(error) {
                    // 出现错误
                    console.log("请求错误");
                    console.log(error);
                },
                success : function(data) {
                    // data 就是responseText返回的数据,但是这里是jQuery处理完成之后的数据
                    let res = JSON.stringify(data)
                    console.log(JSON.parse(res));
                },
                // url : "http://120.55.48.227:8889/captcha/get/" + encodeURI(api.firstdialog.docPath) + '/' + api.firstdialog.problemTypeCode + '/'+ encodeURI(api.firstdialog.problemContent) + '/'+ encodeURI(api.firstdialog.contactWay) + '/'+ encodeURI(api.firstdialog.fileKey),
                url: 'https://open-api-dev.sany.com.cn/gyw-validate/v1/problem/add/2/5/4/1/3',
                type : "get"
            })
        });


        $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        $(window).resize( function  () {
            $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        })
    });
});
