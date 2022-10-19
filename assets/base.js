require(['gitbook', 'jquery'], function(gitbook, $) {
    gitbook.events.on('page.change', function(e, config) {
        var $div = $('<div />').appendTo('body');
        var $message = $('<div />').appendTo('body');
        $message.css('display', "none")
        $message.addClass('right-fixed-message')
        $div.attr('id','right-fixed-box');
        $div.addClass('right-fixed-box')
        let rfHtml = `<div class="right-fixed-box-btn">
                        <div class="r-f-box-firstBtn feedback"><i class="iconfont">&#xec35;</i>问题反馈</div>
                        <div class="r-f-box-firstBtn solicitation" style="display: none"><i class="iconfont">&#xe607;</i>文档征集</div>
                   </div>`
        $div.html(rfHtml)
        var api = {
            firstdialog: {
                docPath: '',
                problemTypeCode: '',
                problemContent: '',
                contactWay: '',
                fileKey: ''
            },
            seconddialog: {
                author: '',
                descript: '',
                fileKey: ''
            },
            showinfo(str){
                $message.show()
                $message.html(`<div>${str}</div>`)
                $message.css('left', $('body').width() * .5 - $message.width() * .5 )
                $message.addClass('danchu')
                setTimeout(()=> {
                    $message.html('')
                    $message.css('display', "none")
                    $message.removeClass('danchu')
                },4500)
            },
            isshake: true
        }

        var $dialogBox = $('<div style="display: none" />').appendTo('body');

        // 问题反馈 开始
        $(document).on("click", ".right-fixed-box-btn .feedback", function () {
            $dialogBox.addClass('right-fixed-firstdialog')
            let dialogHtml = `<div class="r-f-dialog-body">
                                    <div class="r-f-dialog-title">
                                        <div>问题反馈</div>
                                        <i class="iconfont">&#xeb6a;</i>
                                    </div>
                                    <div class="r-f-dialog-content">
                                        <div class="r-f-dialog-form r-f-dialog-form-feedback">
                                            <div>
                                               <div>文档位置</div>
                                                <div>
                                                    <input type="text" name="r-f-docPath" placeholder="请输入文档位置">
                                                </div>
                                            </div>
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
                                                    <textarea placeholder="请输入您的建议或问题" name="r-f-problemContent" cols="30" rows="5" style="resize:none;"></textarea>
                                                </div>
                                            </div>
                                            <div>
                                               <div>联系方式</div>
                                                <div>
                                                    <input type="text" name="r-f-contactWay" placeholder="请留下您的域账号或手机号或邮箱地址">
                                                </div>
                                            </div>
                                            <div>
                                               <div>上传文件</div>
                                                <div>
                                                    <input id="fileKey" type="file" name="fileKey" accept=".jpg,.png,.jpeg" style="display: none">
                                                    <div class="file_btn">
                                                        <div>点击上传</div>
                                                        <span>请上传大小不超过20M,jpg/png格式的图片</span>
                                                    </div>
                                                    <div class="file_info"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="r-f-dialog-footer">
                                        <div class="submit submit-feedback">直接提交</div>
                                    </div>
                               </div>`
            $dialogBox.html(dialogHtml)
            let docPath = ( !window.location.pathname || window.location.pathname === '/') ? '首页': decodeURI(window.location.pathname)
            $('input[name="r-f-docPath"]').val(docPath)
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
        $(document).on("change", ".r-f-dialog-form-feedback #fileKey", function (e) {
            let file = e.target.files[0]
            let type = file.type
            let size = file.size
            let name = e.target.files[0].name
            let typeArr = [ 'image/jpeg', 'image/png']
            if ( !typeArr.includes(type)){
                api.showinfo('请上传jpg/png格式的文件')
                return
            }
            if (size > 20 * 1024 * 1024){
                api.showinfo('请上传不超5M的文件')
                return
            }
            let fileinfoHtml = `<div style="font-size: 10px"> <span style="color:#000;">文件名:</span> <span style="color: #666666">${name}</span> <span style="color: #000000">上传中...</span> </div>`
            $('.r-f-dialog-form-feedback .file_info').html(fileinfoHtml)

            var formData = new FormData();
            formData.append("file",file);
            $.ajax({
                url:'https://open-api-dev.sany.com.cn/gyw-validate/v1/problem/file/upload', /*接口域名地址*/
                type:'post',
                data: formData,
                contentType: false,
                processData: false,
                success:function(res){
                    if (res){
                        api.showinfo('文件上传成功')
                        api.firstdialog.fileKey = res
                        let fileinfoHtml = `<div style="font-size: 10px"> <span style="color:#000;">文件名:</span> <span style="color: #666666">${name}</span> <span style="color: green">上传成功</span> <span id="r-f-preview" class="r-f-preview">新窗口预览</span> </div>`
                        $('.r-f-dialog-form-feedback .file_info').html(fileinfoHtml)
                    }
                },
                error : function(error) {
                    // 出现错误
                    api.showinfo('文件上传失败')

                    let fileinfoHtml = `<div style="font-size: 10px"> <span style="color:#000;">文件名:</span> <span style="color: #666666">${name}</span> <span style="color: red">上传失败</span> </div>`
                    $('.r-f-dialog-form-feedback .file_info').html(fileinfoHtml)
                },
            })

            setTimeout(()=> {
                this.type = 'text'
                this.type = 'file'
            },500)
        });
        $(document).on("click", ".r-f-dialog-content .r-f-dialog-form-feedback .file_btn div", function (e) {
            $('#fileKey').click()
        });


        $(document).on("click", ".r-f-dialog-content .r-f-dialog-form-feedback #r-f-preview", function (e) {
            console.log('新窗口预览')
        });


        $(document).on("click", ".right-fixed-firstdialog .r-f-dialog-body .r-f-dialog-footer .submit-feedback", function () {
            if (!api.isshake){
                return
            }
            api.isshake = false
            var check_value = []
            $('input[name="problemType"]:checked').each(function(){
                //将选中的值添加到数组check_value中
                check_value.push($(this).val());
            });
            if (check_value.length === 0){
                api.showinfo('请选择您反馈问题的类型')
                return
            }
            if( !$('input[name="r-f-docPath"]').val()){
                api.showinfo('请输入文档位置')
                return
            }
            if(!$('textarea[name="r-f-problemContent"]').val()){
                api.showinfo('请输入文档描述')
                return
            }
            if( !$('input[name="r-f-contactWay"]').val()){
                api.showinfo('请输入您的联系方式')
                return
            }
            api.firstdialog.docPath = $('input[name="r-f-docPath"]').val()
            api.firstdialog.problemTypeCode=check_value.join(',')
            api.firstdialog.problemContent=$('textarea[name="r-f-problemContent"]').val()
            api.firstdialog.contactWay= $('input[name="r-f-contactWay"]').val()
            $.ajax({
                asycn : true,
                contentType : "application/json",
                dataType : "json",
                data: JSON.stringify(api.firstdialog),
                error : function() {
                    api.isshake = true
                    api.showinfo('提交失败')
                },
                success : function(data) {
                    api.showinfo('提交成功,谢谢您的反馈')
                    $dialogBox.hide()
                    $dialogBox.html('')
                    api.isshake = true
                },
                url: 'https://open-api-dev.sany.com.cn/gyw-validate/v1/problem/add',
                type : "post"
            })
        });
        // 问题反馈 结束

        // 文档征集 开始
        $(document).on("click", ".right-fixed-box-btn .solicitation", function () {
            $dialogBox.addClass('right-fixed-firstdialog')
            let dialogHtml = `<div class="r-f-dialog-body">
                                    <div class="r-f-dialog-title">
                                        <div>文档征集</div>
                                        <i class="iconfont">&#xeb6a;</i>
                                    </div>
                                    <div class="r-f-dialog-content">
                                        <div class="r-f-dialog-form r-f-dialog-form-solicitation">
                                            <div>

                                               <div>域账号</div>
                                                <div>
                                                    <input type="text" name="author" placeholder="请输入您的域账号">
                                                </div>
                                            </div>
                                            <div>
                                                <div>文档描述</div>
                                                <div>
                                                    <textarea placeholder="请输入您将提交的文档的描述" name="descript" cols="30" rows="5" style="resize:none;"></textarea>
                                                </div>
                                            </div>
                                            <div>
                                               <div>上传文件</div>
                                                <div>
                                                    <input id="docfileKey" type="file" name="fileKey" accept=".jpg,.png,.jpeg" style="display: none">
                                                    <div class="file_btn">
                                                        <div>点击上传</div>
                                                        <span>请上传大小不超过10M,wold/md格式的文档文件</span>
                                                    </div>
                                                    <div class="file_info">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="r-f-dialog-footer">
                                        <div class="submit submit-solicitation">直接提交</div>
                                    </div>
                               </div>`
            $dialogBox.html(dialogHtml)
            $dialogBox.css('top',  $('body').height() * .5 - $dialogBox.height() * .5).css('left',  $('body').width() * .5 - $dialogBox.width() * .5)
            $dialogBox.show()
            api.seconddialog = {
                author: '',
                descript: '',
                fileKey: ''
            }
        });

        $(document).on("change", ".r-f-dialog-form-solicitation #docfileKey", function (e) {
            let file = e.target.files[0]
            let type = file.type
            let size = file.size
            let typeArr = [ 'image/jpeg', 'image/png']
            if ( !typeArr.includes(type)){
                api.showinfo('请上传jpg/png格式的文件')
            }
            if (size > 5 * 1024 * 1024){
                api.showinfo('请上传不超5M的文件')
            }
            let fileinfoHtml = `<div style="font-size: 10px"> <span style="color:#000;">文件名:</span> <span style="color: #666666">${e.target.files[0].name}</span> <span style="color: green">上传成功</span> </div>`
            $('.r-f-dialog-form-solicitation .file_info').html(fileinfoHtml)
            setTimeout(()=> {
                this.type = 'text'
                this.type = 'file'
            },500)
        });
        $(document).on("click", ".r-f-dialog-content .r-f-dialog-form-solicitation .file_btn div", function (e) {
            $('#docfileKey').click()
        });
        $(document).on("click", ".right-fixed-firstdialog .r-f-dialog-body .r-f-dialog-footer .submit-solicitation", function () {
            api.seconddialog = {
                author: $('input[name="author"]').val(),
                descript: $('textarea[name="descript"]').val(),
                fileKey: ''
            }
            console.log(api)
            return
            // $.ajax({
            //     asycn : true,
            //     contentType : "application/json",
            //     dataType : "json",
            //     error : function() {
            //         // 出现错误
            //         alert("请求错误");
            //     },
            //     success : function(data) {
            //         // data 就是responseText返回的数据,但是这里是jQuery处理完成之后的数据
            //         let res = JSON.stringify(data)
            //         console.log(JSON.parse(res));
            //     },
            //     // url : "http://120.55.48.227:8889/captcha/get/" + encodeURI(api.firstdialog.docPath) + '/' + api.firstdialog.problemTypeCode + '/'+ encodeURI(api.firstdialog.problemContent) + '/'+ encodeURI(api.firstdialog.contactWay) + '/'+ encodeURI(api.firstdialog.fileKey),
            //     url: 'https://open-api-dev.sany.com.cn/gyw-validate/v1/problem/add/2/5/4/1/3',
            //     type : "post"
            // })
        });

        // 文档征集 结束

        // 关闭弹窗
        $(document).on("click", ".right-fixed-firstdialog .r-f-dialog-body .r-f-dialog-title i", function () {
            $dialogBox.hide()
            $dialogBox.html('')
        });

        $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        $(window).resize( function  () {
            $div.css('top',  $('body').height() * .5 - $div.height() * .5)
        })

    });
});
