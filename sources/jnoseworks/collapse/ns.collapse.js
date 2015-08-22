/**
 * Jnose: collapse.js v1.0
 * Auther: Carl.Y.Liu
 * URL: http://jnose.com
 */
+(function ($) {
    'use strict';

    var NS = function (opts) {
        return new NS.fn.init(opts);
    };

    NS.VERSION = "1.0";
    NS.TRANSITION_DURATION = 350;
    NS.EXP ={
        in:/\bin\b/ig
    };
    NS.DEFS = {
        toggle: true,
        trigger: "[data-toggle='ns-collapse']",
        el: ""
    };

    NS.fn = NS.prototype;

    /*Initialize*/
    NS.fn.init = function (opts) {
        var ths = this;
        ths.opts = $.extend({}, NS.DEFS, opts);
        ths.$trigger= $(ths.opts.el);
        ths.$target = ths.getTarget(ths.$trigger);

    };

    NS.fn.getTarget=function($trigger){
        var href;
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
        return $(target)
    };
    NS.fn.isShow=function(){
        return NS.EXP.in.test(this.$target.attr("class"));
    };


    /*trigger show function*/
    NS.fn.show = function () {
        /*whether show*/
        if(NS.EXP.in.test(this.$target.attr("class"))){
            return;
        }

        var ths = this;

        console.log("show");


        ths.$target.addClass("ns-collapsing in");

        if (ths.$target.height() == 0) {
            ths.$target.height(100);

        } else {
            ths.$target.height(0);
        }

    };
    /*trigger hide function*/
    NS.fn.hide=function(){
        /*whether hide*/
        if(!this.isShow()) return;


    };

    /*support*/
    NS.fn.support={
        transition : function () {
            var myBody = document.body || document.documentElement,
                myStyle = myBody.style,
                support = myStyle.transition !== undefined ||
                    myStyle.WebkitTransition !== undefined ||
                    myStyle.MozTransition !== undefined ||
                    myStyle.MsTransition !== undefined ||
                    myStyle.OTransition !== undefined;
            return support;
        }
    };

    NS.fn.init.prototype = NS.fn;


    // TAB PLUGIN DEFINITION
    // =====================
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('ns.collapse');

            if (!data) $this.data('ns.collapse', (data = NS({el: $(this)})));

            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab;

    $.fn.tab = Plugin;
    $.fn.tab.Constructor = NS.init;


    // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this
    };


    // TAB DATA-API
    // ============

    var clickHandler = function (e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    };

    $(document)
        .on('click.ns.collapse', "[data-toggle='ns-collapse']", clickHandler);


    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], function () {
            return NS;
        });
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = NS;
    } else {
        // Browser globals
        window.Tab = NS;
    }

}(jQuery));