/**
 * Jnose: nav.js v1.0
 * Auther: Carl.Y.Liu
 * URL: http://jnose.com
 */
;(function(){
    'use strict';

    var NS = function (el) {
        return new NS.fn.init(el);
    };

    NS.VERSION = "1.0";
    NS.TRANSITION_DURATION = 150;
    NS.DEFS={
        isScreenFollow:true,
        container:".ns-nav",
        selected:""
    };

    NS.fn = NS.prototype;


    /*Initialize*/
    NS.fn.init = function (opts) {
        var ths =this;
        opts && $.extend(NS.DEFS, opts);
        ths.DEFS=NS.DEFS;

        console.log(this.$item)

        ths.$item =ths.DEFS.selected;
        ths.$main = ths.$item.parent();
        ths.$icon = ths.$item.children("a .ns-icon");
        ths.$nav = ths.$item.closest(".ns-nav");

        ths.events();
    };

    NS.fn.init.prototype = NS.fn;

    NS.fn.isMobi=function(){
        return $(".ns-nav-bar").css("display")=="none"?false:true;
    };

    NS.fn.show=function(){
        console.log(this.isMobi())
        if(this.isMobi()){
            /*mobile*/
            if(this.$main.hasClass("ns-open")){
                this.$main.removeClass("ns-open");
            }else{
                this.$main.addClass("ns-open");
            }
        }else{
            /*web*/
            this.$main.removeClass("ns-open");
        }
    };

    NS.fn.events=function(){

        var ths =this,
            $nav = ths.$nav,
            pos=$nav.offset();

        $(window)
            .resize(function(){
            /*add transform trigger*/
                ths.isMobi()||$(".ns-nav .ns-open").removeClass("ns-open");
            })
            .scroll(function(){

                var sclTop=$(this).scrollTop();

                if(sclTop>pos.top){
                    $nav.addClass("ns-nav-scroll");
                }else if(sclTop<=pos.top){
                    $nav.removeClass("ns-nav-scroll");
                }
            })
            .scroll();

    };

    /*clear open*/
    NS.fn.clear=function(scope){
        $("[class*='-open']",scope).each(function(){
            var curr = $(this),
                currCls=curr.attr("class").replace(/-open/ig,"");
            curr.attr("class",currCls);
        });
    };

    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {

        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('ns.tab');

            if (!data) $this.data('ns.tab', (data = NS({selected:$(this)})));

            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.nav;

    $.fn.nav             = Plugin;
    $.fn.nav.Constructor = NS.init;


    // TAB NO CONFLICT
    // ===============

    $.fn.nav.noConflict = function () {
        $.fn.nav = old;
        return this
    };


    // TAB DATA-API
    // ============
    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    };

    $(document)
        .on('click.ns.nav', '.ns-nav-item,.ns-nav-bar', clickHandler);


    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], function(){
            return NS;
        });
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = NS;
    } else {
        // Browser globals
        window.Navbar=NS;
    }
}(jQuery));