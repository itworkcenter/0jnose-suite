/* ========================================================================
 * Jnose: collapse.js v1.0
 * Auther: Carl.Y.Liu
 * URL: http://jonse.com/
 * ========================================================================*/

+function ($) {
    'use strict';

    // CLASS DEFINITION
    // ================================

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

        if (ths.support.transition) {
            ths.$target
                .removeClass("ns-collapse")
                .addClass("ns-collapsing in");
            ths.$target.height(ths.$target[0]["scrollHeight"]);
        } else {
            ths.$target.addClass("in");
        }

    };
    //HIDE
    NS.fn.hide = function () {

        var ths = this;

        if (!this.isShow()) return;

        if (ths.support.transition) {
            ths.$target.height(ths.$target[0]["scrollHeight"]);

            ths.$target
                .removeClass("ns-collapse in")
                .addClass("ns-collapsing");

            ths.$target.height(0);

        } else {
            ths.$target.removeClass("in")
        }


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

    var handler = function (e) {
        var $this = $(this);

        if (!$this.attr('data-target')) e.preventDefault();

        var option = $.extend({}, $this.data(), {trigger: this});

        Plugin.call($(this), option)
    };

    $(document)
        .on('click.ns.collapse', "[data-toggle='ns-collapse']", handler);


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

}(jQuery);