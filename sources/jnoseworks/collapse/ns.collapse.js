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
        ths.$trigger = $(ths.opts.el);
        ths.$target = ths.getTarget(ths.$trigger);
        ths.$parent = ths.getParent(ths.$trigger);

        if (this.opts.toggle) this.toggle();
    };

    NS.fn.getTarget = function ($trigger) {
        var href;
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
        return $(target)
    };

    NS.fn.getParent = function ($trigger) {
        return $($trigger.data().parent);
    };

    NS.fn.isShow = function () {
        return /\bin\b/ig.test(this.$target.attr("class"));
    };

    NS.fn.toggle = function () {
        this[this.$target.hasClass('in') ? 'hide' : 'show']();
    };
    /*trigger show function*/
    NS.fn.show = function () {
        var ths = this;
        /*whether show*/
        if (this.isShow())return;
        console.log("show");

        /*var activeData;
        var actives = this.$parent && this.$parent.find(".ns-collapsing");

        if (actives && actives.length) {
            activeData = actives.data("ns.collapse");
            console.log(activeData)
        }*/


        ths.$target
            .removeClass("ns-collapse")
            .addClass("ns-collapsing in");
        ths.$target.height(this.$target[0]["scrollHeight"]);

    };
    /*trigger hide function*/
    NS.fn.hide = function () {
        var ths = this;
        /*whether hide*/
        if (!this.isShow()) return;

        console.log("hide");

        ths.$target
            .removeClass("ns-collapse")
            .addClass("ns-collapsing in");
        ths.$target.height(0);
    };

    /*support*/
    NS.fn.support = {
        transition: function () {
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

            if (!data) $this.data('ns.collapse', (data = NS({el: $(this),options:option})));

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
        var $this = $(this);

        if (!$this.attr('data-target')) e.preventDefault();
        var option  = $.extend({}, $this.data(), { trigger: this });
        Plugin.call($(this),option)
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