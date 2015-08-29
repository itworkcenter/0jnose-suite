/* ========================================================================
 * Jnose: collapse.js v1.0
 * Auther: Carl.Y.Liu
 * URL: http://jonse.com/
 * Support: IE7/IE8/IE9/IE10/IE11/EDAGE/Firefox/Safari/Opera/Chrome
 * ========================================================================*/

+function ($) {
    'use strict';

    // CLASS DEFINITION
    // ================================

    var NS = function (opts) {
        return new NS.fn.init(opts);
    };

    NS.VERSION = "1.0";
    NS.DURATION = 350;
    NS.EVENTS={
        shown:"shown.ns.collapse",
        hidden:"hidden.ns.collapse"
    };
    NS.DEFS = {
        toggle: true,
        trigger: "[data-toggle='ns-collapse']",
        el: ""
    };

    //ALIAS
    NS.fn = NS.prototype;

    //INITIALIZE
    NS.fn.init = function (opts) {
        var ths = this;
        ths.opts = $.extend({}, NS.DEFS, opts);
        ths.$trigger = $(ths.opts.el);
        ths.$target = ths.getTarget(ths.$trigger);
        ths.$parent = ths.getParent(ths.$trigger);

        if (ths.opts.toggle) ths.toggle();
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
        this[this.isShow() ? 'hide' : 'show']();
    };

    //SHOW
    NS.fn.show = function () {

        var ths = this;

        if (this.isShow())return;

        var actives = ths.$parent && ths.$parent.find(".in");
        var context = actives[0] && ths.$parent
                .find("[data-toggle='ns-collapse'][data-target='#" + actives[0].id + "']");

        if (actives && actives.length) {
            Plugin.call(context, "hide");
        }

        ths.show[ths.support.transition?"trans":"notrans"].apply(this);

    };
    NS.fn.show.trans=function(){

        var ths =this;

        ths.$target
            .removeClass("ns-collapse")
            .addClass("ns-collapsing in")
            .height(ths.$target[0]["scrollHeight"]);
    };
    NS.fn.show.notrans=function(){

        var ths =this;

        ths.$target
            .height(0)
            .addClass("in")
            .animate(
            {height: ths.$target[0]["scrollHeight"]},
            ths.DURATION,
            function(){
                ths.$target.trigger(NS.EVENTS.shown);
            });
    };

    //HIDE
    NS.fn.hide = function () {

        var ths = this;

        if (!this.isShow()) return;

        ths.hide[ths.support.transition?"trans":"notrans"].apply(this);
    };
    /*support css transition*/
    NS.fn.hide.trans=function(){

        var ths =this;

        ths.$target
            .height(ths.$target[0]["scrollHeight"]);

        ths.$target
            .removeClass("ns-collapse in")
            .addClass("ns-collapsing");

        ths.$target.height(0);

    };
    /*no support css transition*/
    NS.fn.hide.notrans=function(){

        var ths =this;

        ths.$target
            .animate(
            {height: 0},
            ths.DURATION,
            function () {
                $(this).removeClass("in");
                ths.$target.trigger(NS.EVENTS.hidden);
            });

    };

    //TRANSITION SUPPORT
    function transition() {
        var myBody = document.body || document.documentElement,
            myStyle = myBody.style,
            support = myStyle.transition !== undefined ||
                myStyle.WebkitTransition !== undefined ||
                myStyle.MozTransition !== undefined ||
                myStyle.MsTransition !== undefined ||
                myStyle.OTransition !== undefined;
        return support;
    }

    NS.fn.support = {
        transition: transition()
    };

    //INSTANTIATION
    NS.fn.init.prototype = NS.fn;

    // PLUGIN DEFINITION
    // =====================
    function Plugin(option) {
        return this.each(function () {

            var $this = $(this),
                data = $this.data('ns.collapse'),
                option = data ? "toggle" : option;

            if (!data) $this.data('ns.collapse', (data = NS({el: $(this), options: option})));

            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.collapse;

    $.fn.collapse = Plugin;
    $.fn.collapse.Constructor = NS.init;


    // NO CONFLICT
    // ===============
    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old;
        return this
    };


    // DATA-API
    // ============
    var handler={
        click:function (e) {
            var $this = $(this);

            if (!$this.attr('data-target')) e.preventDefault();

            var option = $.extend({}, $this.data(), {trigger: this});

            Plugin.call($(this), option);
        },
        resize:function(){
            /*compatibly  collapse height and width when resizing*/
            $(".ns-collapse.in,.ns-collapsing.in").height("auto");
        }
    };

    $(document)
        .on('click.ns.collapse', "[data-toggle='ns-collapse']", handler.click);

    $(window)
        .on("resize",handler.resize);


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
        window.Collapse = NS;
    }

}(jQuery);