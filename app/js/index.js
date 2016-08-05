const $ = require('jquery');
const _ = require('underscore');
const {ipcRenderer} = require('electron');


var Main = {
    _cfg:{
        list_tpl:_.template($('#list-tpl').html())
    },
    //获得文章列表
    getList:function(){
        var _this = this;
        $.ajax({
            url:'http://news-at.zhihu.com/api/4/news/latest',
            dataType: 'json',
            type:'get'
        }).done(function(data){
            var _json = {
                'list':data.stories
            };
            $('#list-wrap').append(_this._cfg.list_tpl(_json));
            $($('.left-list')[0]).trigger('click');
        }).fail(function(){
            alert('傻逼没联网');
        })
    },
    //获得单个文章
    getPage:function(_id){
        var _this = this;
        $.ajax({
            url:'http://news-at.zhihu.com/api/4/news/'+_id,
            dataType: 'json',
            type:'get'
        }).done(function(data){
            var _img = data.image;
            var $_img = $('<img src="'+_img+'" />');
            var _body = '<div class="handler">'+data.body+'</div>';
            $('.handler').remove();
            $('.content1').append(_body);
            $('.img-place-holder').css({'backgroundImage':'url('+_img+')'});
            // $('.img-place-holder').append($_img);
        }).fail(function(){
            alert('傻逼没联网');
        })
    },
    //绑定列表item点击事件
    bindClickItem:function(){
        var _this = this;
        $('.left').on('click','.left-list',function(){
            var _id = $(this).attr('data-pageid');
            _this.getPage(_id);
        });
    },
    listenEvent:function(){
        ipcRenderer.on('getMessage',(event,arg)=>{
            console.log(111);
            console.log(arg);
        });
        ipcRenderer.on('ping',(event,arg)=>{
            console.log(arg);
        });
    },
    openNewWindow:function(){
        $('button').click(function(){
            ipcRenderer.send('synchronous-message', 'openChildWindow');
        })
    },
    //初始化方法
    init:function(){
        this.getList();
        this.bindClickItem();
        // this.listenEvent();
        // this.openNewWindow();
    }
};

Main.init();