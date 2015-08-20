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
    NS.DEFS={
        toggle:true,
        trigger:"[data-toggle='ns-collapse']",
        el:""
    };

    NS.fn = NS.prototype;

    /*Initialize*/
    NS.fn.init = function (opts) {
        var ths =this;
        ths.opts = $.extend({},NS.DEFS, opts);
        ths.$target = $($(ths.opts.el).attr('data-target')||$(ths.opts.el).attr('href'));

        console.log(ths.$target);

    };

    NS.fn.show = function () {
        console.log("show");

        var ths = this;
        if(!/\bns-in\b/ig.test(ths.$target.attr("class"))){
            ths.$target.addClass("ns-collapsing ns-in").height(100);
            setTimeout(function(){
                ths.$target.removeClass("ns-collapsing")
            },500)

        }else{
            ths.$target.addClass("ns-collapsing ns-in").height(0);
            setTimeout(function(){
                ths.$target.removeClass("ns-collapsing ns-in")
            },500)
        }

    };

    NS.fn.init.prototype = NS.fn;


    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {

        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('ns.collapse');

            if (!data) $this.data('ns.collapse', (data = NS({el:$(this)})));

            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.tab;

    $.fn.tab             = Plugin;
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