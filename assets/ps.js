! function (t, e, s, i) {
    function n(e, s) {
        this.settings = null, this.options = t.extend({}, n.Defaults, s), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, s) {
            this._handlers[s] = t.proxy(this[s], this)
        }, this)), t.each(n.Plugins, t.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(n.Workers, t.proxy(function (e, s) {
            this._pipe.push({
                filter: s.filter,
                run: t.proxy(s.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    n.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "ps-refresh",
        loadedClass: "ps-loaded",
        loadingClass: "ps-loading",
        rtlClass: "ps-rtl",
        responsiveClass: "ps-responsive",
        dragClass: "ps-drag",
        itemClass: "ps-item",
        stageClass: "ps-stage",
        stageOuterClass: "ps-stage-outer",
        grabClass: "ps-grab"
    }, n.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, n.Type = {
        Event: "event",
        State: "state"
    }, n.Plugins = {}, n.Workers = [{
        filter: ["width", "settings"],
        run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = this.settings.margin || "",
                s = !this.settings.autoWidth,
                i = this.settings.rtl,
                n = {
                    width: "auto",
                    "margin-left": i ? e : "",
                    "margin-right": i ? "" : e
                };
            !s && this.$stage.children().css(n), t.css = n
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                s = null,
                i = this._items.length,
                n = !this.settings.autoWidth,
                r = [];
            for (t.items = {
                    merge: !1,
                    width: e
                }; i--;) s = this._mergers[i], s = this.settings.mergeFit && Math.min(s, this.settings.items) || s, t.items.merge = s > 1 || t.items.merge, r[i] = n ? e * s : this._items[i].width();
            this._widths = r
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            var e = [],
                s = this._items,
                i = this.settings,
                n = Math.max(2 * i.items, 4),
                r = 2 * Math.ceil(s.length / 2),
                o = i.loop && s.length ? i.rewind ? n : Math.max(n, r) : 0,
                a = "",
                h = "";
            for (o /= 2; o--;) e.push(this.normalize(e.length / 2, !0)), a += s[e[e.length - 1]][0].outerHTML, e.push(this.normalize(s.length - 1 - (e.length - 1) / 2, !0)), h = s[e[e.length - 1]][0].outerHTML + h;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(h).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, s = -1, i = 0, n = 0, r = []; ++s < e;) i = r[s - 1] || 0, n = this._widths[this.relative(s)] + this.settings.margin, r.push(i + n * t);
            this._coordinates = r
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                s = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(s)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = this._coordinates.length,
                s = !this.settings.autoWidth,
                i = this.$stage.children();
            if (s && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], i.eq(e).css(t.css);
            else s && (t.css.width = t.items.width, i.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function () {
            var t, e, s, i, n = this.settings.rtl ? 1 : -1,
                r = 2 * this.settings.stagePadding,
                o = this.coordinates(this.current()) + r,
                a = o + this.width() * n,
                h = [];
            for (s = 0, i = this._coordinates.length; i > s; s++) t = this._coordinates[s - 1] || 0, e = Math.abs(this._coordinates[s]) + r * n, (this.op(t, "<=", o) && this.op(t, ">", a) || this.op(e, "<", o) && this.op(e, ">", a)) && h.push(s);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], n.prototype.initialize = function () {
        var e, s, n;
        (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (e = this.$element.find("img"), s = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : i, n = this.$element.children(s).width(), e.length && 0 >= n && this.preloadAutoWidthImages(e));
        this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, n.prototype.setup = function () {
        var e = this.viewport(),
            s = this.options.responsive,
            i = -1,
            n = null;
        s ? (t.each(s, function (t) {
            e >= t && t > i && (i = Number(t))
        }), delete(n = t.extend({}, this.options, s[i])).responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : n = t.extend({}, this.options), null !== this.settings && this._breakpoint === i || (this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }), this._breakpoint = i, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, n.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, n.prototype.prepare = function (e) {
        var s = this.trigger("prepare", {
            content: e
        });
        return s.data || (s.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
            content: s.data
        }), s.data
    }, n.prototype.update = function () {
        for (var e = 0, s = this._pipe.length, i = t.proxy(function (t) {
                return this[t]
            }, this._invalidated), n = {}; s > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, i).length > 0) && this._pipe[e].run(n), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, n.prototype.width = function (t) {
        switch (t = t || n.Width.Default) {
            case n.Width.Inner:
            case n.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, n.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, n.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, n.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, n.prototype.registerEventHandlers = function () {
        t.support.transition && this.$stage.on(t.support.transition.end + ".ps.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.ps.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.ps.core selectstart.ps.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.ps.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.ps.core", t.proxy(this.onDragEnd, this)))
    }, n.prototype.onDragStart = function (e) {
        var i = null;
        3 !== e.which && (t.support.transform ? i = {
            x: (i = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === i.length ? 12 : 4],
            y: i[16 === i.length ? 13 : 5]
        } : (i = this.$stage.position(), i = {
            x: this.settings.rtl ? i.left + this.$stage.width() - this.width() + this.settings.margin : i.left,
            y: i.top
        }), this.is("animating") && (t.support.transform ? this.animate(i.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = i, this._drag.stage.current = i, this._drag.pointer = this.pointer(e), t(s).on("mouseup.ps.core touchend.ps.core", t.proxy(this.onDragEnd, this)), t(s).one("mousemove.ps.core touchmove.ps.core", t.proxy(function (e) {
            var i = this.difference(this._drag.pointer, this.pointer(e));
            t(s).on("mousemove.ps.core touchmove.ps.core", t.proxy(this.onDragMove, this)), Math.abs(i.x) < Math.abs(i.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, n.prototype.onDragMove = function (t) {
        var e = null,
            s = null,
            i = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            r = this.difference(this._drag.stage.start, n);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), s = this.coordinates(this.maximum() + 1) - e, r.x = ((r.x - e) % s + s) % s + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), s = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), i = this.settings.pullDrag ? -1 * n.x / 5 : 0, r.x = Math.max(Math.min(r.x, e + i), s + i)), this._drag.stage.current = r, this.animate(r.x))
    }, n.prototype.onDragEnd = function (e) {
        var i = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            r = i.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(s).off(".ps.core"), this.$element.removeClass(this.options.grabClass), (0 !== i.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== i.x ? r : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = r, (Math.abs(i.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.ps.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, n.prototype.closest = function (e, s) {
        var i = -1,
            n = this.width(),
            r = this.coordinates();
        return this.settings.freeDrag || t.each(r, t.proxy(function (t, o) {
            return "left" === s && e > o - 30 && o + 30 > e ? i = t : "right" === s && e > o - n - 30 && o - n + 30 > e ? i = t + 1 : this.op(e, "<", o) && this.op(e, ">", r[t + 1] || o - n) && (i = "left" === s ? t + 1 : t), -1 === i
        }, this)), this.settings.loop || (this.op(e, ">", r[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", r[this.maximum()]) && (i = e = this.maximum())), i
    }, n.prototype.animate = function (e) {
        var s = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), s && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : s ? this.$stage.animate({
            left: e + "px"
        }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: e + "px"
        })
    }, n.prototype.is = function (t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, n.prototype.current = function (t) {
        if (t === i) return this._current;
        if (0 === this._items.length) return i;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== i && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, n.prototype.invalidate = function (e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
            return e
        })
    }, n.prototype.reset = function (t) {
        (t = this.normalize(t)) !== i && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, n.prototype.normalize = function (t, e) {
        var s = this._items.length,
            n = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || 1 > s ? t = i : (0 > t || t >= s + n) && (t = ((t - n / 2) % s + s) % s + n / 2), t
    }, n.prototype.relative = function (t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, n.prototype.maximum = function (t) {
        var e, s = this.settings,
            i = this._coordinates.length,
            n = Math.abs(this._coordinates[i - 1]) - this._width,
            r = -1;
        if (s.loop) i = this._clones.length / 2 + this._items.length - 1;
        else if (s.autoWidth || s.merge)
            for (; i - r > 1;) Math.abs(this._coordinates[e = i + r >> 1]) < n ? r = e : i = e;
        else i = s.center ? this._items.length - 1 : this._items.length - s.items;
        return t && (i -= this._clones.length / 2), Math.max(i, 0)
    }, n.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, n.prototype.items = function (t) {
        return t === i ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, n.prototype.mergers = function (t) {
        return t === i ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, n.prototype.clones = function (e) {
        var s = this._clones.length / 2,
            n = s + this._items.length,
            r = function (t) {
                return t % 2 == 0 ? n + t / 2 : s - (t + 1) / 2
            };
        return e === i ? t.map(this._clones, function (t, e) {
            return r(e)
        }) : t.map(this._clones, function (t, s) {
            return t === e ? r(s) : null
        })
    }, n.prototype.speed = function (t) {
        return t !== i && (this._speed = t), this._speed
    }, n.prototype.coordinates = function (e) {
        var s, n = 1,
            r = e - 1;
        return e === i ? t.map(this._coordinates, t.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, r = e + 1), s = this._coordinates[e], s += (this.width() - s + (this._coordinates[r] || 0)) / 2 * n) : s = this._coordinates[r] || 0, s = Math.ceil(s))
    }, n.prototype.duration = function (t, e, s) {
        return 0 === s ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(s || this.settings.smartSpeed)
    }, n.prototype.to = function (t, e) {
        var s = this.current(),
            i = null,
            n = t - this.relative(s),
            r = (n > 0) - (0 > n),
            o = this._items.length,
            a = this.minimum(),
            h = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(n) > o / 2 && (n += -1 * r * o), (i = (((t = s + n) - a) % o + o) % o + a) !== t && h >= i - n && i - n > 0 && (s = i - n, t = i, this.reset(s))) : this.settings.rewind ? t = (t % (h += 1) + h) % h : t = Math.max(a, Math.min(h, t)), this.speed(this.duration(s, t, e)), this.current(t), this.$element.is(":visible") && this.update()
    }, n.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, n.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, n.prototype.onTransitionEnd = function (t) {
        return (t === i || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"))
    }, n.prototype.viewport = function () {
        var i;
        if (this.options.responsiveBaseElement !== e) i = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth) i = e.innerWidth;
        else {
            if (!s.documentElement || !s.documentElement.clientWidth) throw "Can not detect viewport width.";
            i = s.documentElement.clientWidth
        }
        return i
    }, n.prototype.replace = function (e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
            return 1 === this.nodeType
        }).each(t.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, n.prototype.add = function (e, s) {
        var n = this.relative(this._current);
        s = s === i ? this._items.length : this.normalize(s, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: s
        }), e = this.prepare(e), 0 === this._items.length || s === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[s - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[s].before(e), this._items.splice(s, 0, e), this._mergers.splice(s, 0, 1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: s
        })
    }, n.prototype.remove = function (t) {
        (t = this.normalize(t, !0)) !== i && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, n.prototype.preloadAutoWidthImages = function (e) {
        e.each(t.proxy(function (e, s) {
            this.enter("pre-loading"), s = t(s), t(new Image).one("load", t.proxy(function (t) {
                s.attr("src", t.target.src), s.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", s.attr("src") || s.attr("data-src") || s.attr("data-src-retina"))
        }, this))
    }, n.prototype.destroy = function () {
        for (var i in this.$element.off(".ps.core"), this.$stage.off(".ps.core"), t(s).off(".ps.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[i].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("ps.carousel")
    }, n.prototype.op = function (t, e, s) {
        var i = this.settings.rtl;
        switch (e) {
            case "<":
                return i ? t > s : s > t;
            case ">":
                return i ? s > t : t > s;
            case ">=":
                return i ? s >= t : t >= s;
            case "<=":
                return i ? t >= s : s >= t
        }
    }, n.prototype.on = function (t, e, s, i) {
        t.addEventListener ? t.addEventListener(e, s, i) : t.attachEvent && t.attachEvent("on" + e, s)
    }, n.prototype.off = function (t, e, s, i) {
        t.removeEventListener ? t.removeEventListener(e, s, i) : t.detachEvent && t.detachEvent("on" + e, s)
    }, n.prototype.trigger = function (e, s, i, r, o) {
        var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            h = t.camelCase(t.grep(["on", e, i], function (t) {
                return t
            }).join("-").toLowerCase()),
            l = t.Event([e, "ps", i || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, a, s));
        return this._supress[e] || (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(l)
        }), this.register({
            type: n.Type.Event,
            name: e
        }), this.$element.trigger(l), this.settings && "function" == typeof this.settings[h] && this.settings[h].call(this, l)), l
    }, n.prototype.enter = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            this._states.current[e] === i && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, n.prototype.leave = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            this._states.current[e]--
        }, this))
    }, n.prototype.register = function (e) {
        if (e.type === n.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].ps) {
                var s = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function (t) {
                    return !s || !s.apply || t.namespace && -1 !== t.namespace.indexOf("ps") ? t.namespace && t.namespace.indexOf("ps") > -1 : s.apply(this, arguments)
                }, t.event.special[e.name].ps = !0
            }
        } else e.type === n.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (s, i) {
            return t.inArray(s, this._states.tags[e.name]) === i
        }, this)))
    }, n.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, n.prototype.release = function (e) {
        t.each(e, t.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, n.prototype.pointer = function (t) {
        var s = {
            x: null,
            y: null
        };
        return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (s.x = t.pageX, s.y = t.pageY) : (s.x = t.clientX, s.y = t.clientY), s
    }, n.prototype.isNumeric = function (t) {
        return !isNaN(parseFloat(t))
    }, n.prototype.difference = function (t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, t.fn.psCarousel = function (e) {
        var s = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var i = t(this),
                r = i.data("ps.carousel");
            r || (r = new n(this, "object" == typeof e && e), i.data("ps.carousel", r), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, s) {
                r.register({
                    type: n.Type.Event,
                    name: s
                }), r.$element.on(s + ".ps.carousel.core", t.proxy(function (t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([s]), r[s].apply(this, [].slice.call(arguments, 1)), this.release([s]))
                }, r))
            })), "string" == typeof e && "_" !== e.charAt(0) && r[e].apply(r, s)
        })
    }, t.fn.psCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this._core = e, this._interval = null, this._visible = null, this._handlers = {
            "initialized.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, n.prototype.watch = function () {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, n.prototype.refresh = function () {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("ps-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, n.prototype.destroy = function () {
        var t, s;
        for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
    }, t.fn.psCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.ps.carousel change.ps.carousel resized.ps.carousel": t.proxy(function (e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                    for (var s = this._core.settings, i = s.center && Math.ceil(s.items / 2) || s.items, n = s.center && -1 * i || 0, r = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + n, o = this._core.clones().length, a = t.proxy(function (t, e) {
                            this.load(e)
                        }, this); n++ < i;) this.load(o / 2 + this._core.relative(r)), o && t.each(this._core.clones(this._core.relative(r)), a), r++
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        lazyLoad: !1
    }, n.prototype.load = function (s) {
        var i = this._core.$stage.children().eq(s),
            n = i && i.find(".ps-lazy");
        !n || t.inArray(i.get(0), this._loaded) > -1 || (n.each(t.proxy(function (s, i) {
            var n, r = t(i),
                o = e.devicePixelRatio > 1 && r.attr("data-src-retina") || r.attr("data-src");
            this._core.trigger("load", {
                element: r,
                url: o
            }, "lazy"), r.is("img") ? r.one("load.ps.lazy", t.proxy(function () {
                r.css("opacity", 1), this._core.trigger("loaded", {
                    element: r,
                    url: o
                }, "lazy")
            }, this)).attr("src", o) : ((n = new Image).onload = t.proxy(function () {
                r.css({
                    "background-image": "url(" + o + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: r,
                    url: o
                }, "lazy")
            }, this), n.src = o)
        }, this)), this._loaded.push(i.get(0)))
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.psCarousel.Constructor.Plugins.Lazy = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this._core = e, this._handlers = {
            "initialized.ps.carousel refreshed.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this),
            "loaded.ps.lazy": t.proxy(function (t) {
                t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    n.Defaults = {
        autoHeight: !1,
        autoHeightClass: "ps-height"
    }, n.prototype.update = function () {
        var e, s = this._core._current,
            i = s + this._core.settings.items,
            n = this._core.$stage.children().toArray().slice(s, i),
            r = [];
        t.each(n, function (e, s) {
            r.push(t(s).height())
        }), e = Math.max.apply(null, r), this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.psCarousel.Constructor.Plugins.AutoHeight = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this._core = e, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
            }, this),
            "refreshed.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .ps-video-frame").remove()
            }, this),
            "changed.ps.carousel": t.proxy(function (t) {
                t.namespace && "position" === t.property.name && this._playing && this.stop()
            }, this),
            "prepared.ps.carousel": t.proxy(function (e) {
                if (e.namespace) {
                    var s = t(e.content).find(".ps-video");
                    s.length && (s.css("display", "none"), this.fetch(s, t(e.content)))
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.ps.video", ".ps-video-play-icon", t.proxy(function (t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, n.prototype.fetch = function (t, e) {
        var s = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
            i = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            r = t.attr("data-height") || this._core.settings.videoHeight,
            o = t.attr("href");
        if (!o) throw new Error("Missing video URL.");
        if ((i = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) s = "youtube";
        else if (i[3].indexOf("vimeo") > -1) s = "vimeo";
        else {
            if (!(i[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            s = "vzaar"
        }
        i = i[6], this._videos[o] = {
            type: s,
            id: i,
            width: n,
            height: r
        }, e.attr("data-video", o), this.thumbnail(t, this._videos[o])
    }, n.prototype.thumbnail = function (e, s) {
        var i, n, r = s.width && s.height ? 'style="width:' + s.width + "px;height:" + s.height + 'px;"' : "",
            o = e.find("img"),
            a = "src",
            h = "",
            l = this._core.settings,
            p = function (t) {
                '<div class="ps-video-play-icon"></div>',
                i = l.lazyLoad ? '<div class="ps-video-tn ' + h + '" ' + a + '="' + t + '"></div>' : '<div class="ps-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
                e.after(i),
                e.after('<div class="ps-video-play-icon"></div>')
            };
        return e.wrap('<div class="ps-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (a = "data-src", h = "ps-lazy"), o.length ? (p(o.attr(a)), o.remove(), !1) : void("youtube" === s.type ? (n = "//img.youtube.com/vi/" + s.id + "/hqdefault.jpg", p(n)) : "vimeo" === s.type ? t.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + s.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                n = t[0].thumbnail_large, p(n)
            }
        }) : "vzaar" === s.type && t.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + s.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                n = t.framegrab_url, p(n)
            }
        }))
    }, n.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".ps-video-frame").remove(), this._playing.removeClass("ps-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, n.prototype.play = function (e) {
        var s, i = t(e.target).closest("." + this._core.settings.itemClass),
            n = this._videos[i.attr("data-video")],
            r = n.width || "100%",
            o = n.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), "youtube" === n.type ? s = '<iframe width="' + r + '" height="' + o + '" src="//www.youtube.com/embed/' + n.id + "?autoplay=1&v=" + n.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === n.type ? s = '<iframe src="//player.vimeo.com/video/' + n.id + '?autoplay=1" width="' + r + '" height="' + o + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === n.type && (s = '<iframe frameborder="0"height="' + o + '"width="' + r + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + n.id + '/player?autoplay=true"></iframe>'), t('<div class="ps-video-frame">' + s + "</div>").insertAfter(i.find(".ps-video")), this._playing = i.addClass("ps-video-playing"))
    }, n.prototype.isInFullScreen = function () {
        var e = s.fullscreenElement || s.mozFullScreenElement || s.webkitFullscreenElement;
        return e && t(e).parent().hasClass("ps-video-frame")
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this._core.$element.off("click.ps.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.psCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = i, this.next = i, this.handlers = {
            "change.ps.carousel": t.proxy(function (t) {
                t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this),
            "drag.ps.carousel dragged.ps.carousel translated.ps.carousel": t.proxy(function (t) {
                t.namespace && (this.swapping = "translated" == t.type)
            }, this),
            "translate.ps.carousel": t.proxy(function (t) {
                t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, n.prototype.swap = function () {
        if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
            this.core.speed(0);
            var e, s = t.proxy(this.clear, this),
                i = this.core.$stage.children().eq(this.previous),
                n = this.core.$stage.children().eq(this.next),
                r = this.core.settings.animateIn,
                o = this.core.settings.animateOut;
            this.core.current() !== this.previous && (o && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(t.support.animation.end, s).css({
                left: e + "px"
            }).addClass("animated ps-animated-out").addClass(o)), r && n.one(t.support.animation.end, s).addClass("animated ps-animated-in").addClass(r))
        }
    }, n.prototype.clear = function (e) {
        t(e.target).css({
            left: ""
        }).removeClass("animated ps-animated-out ps-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.psCarousel.Constructor.Plugins.Animate = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    var n = function (e) {
        this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
            "changed.ps.carousel": t.proxy(function (t) {
                t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
            }, this),
            "initialized.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.ps.autoplay": t.proxy(function (t, e, s) {
                t.namespace && this.play(e, s)
            }, this),
            "stop.ps.autoplay": t.proxy(function (t) {
                t.namespace && this.stop()
            }, this),
            "mouseover.ps.autoplay": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.ps.autoplay": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.ps.core": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.ps.core": t.proxy(function () {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.play = function (t, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
    }, n.prototype._getNextTimeout = function (i, n) {
        return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function () {
            this._paused || this._core.is("busy") || this._core.is("interacting") || s.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
        }, this), i || this._core.settings.autoplayTimeout)
    }, n.prototype._setAutoPlayInterval = function () {
        this._timeout = this._getNextTimeout()
    }, n.prototype.stop = function () {
        this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
    }, n.prototype.pause = function () {
        this._core.is("rotating") && (this._paused = !0)
    }, n.prototype.destroy = function () {
        var t, e;
        for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.psCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    "use strict";
    var n = function (e) {
        this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.ps.carousel": t.proxy(function (e) {
                e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
            }, this),
            "remove.ps.carousel": t.proxy(function (t) {
                t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this),
            "changed.ps.carousel": t.proxy(function (t) {
                t.namespace && "position" == t.property.name && this.draw()
            }, this),
            "initialized.ps.carousel": t.proxy(function (t) {
                t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.ps.carousel": t.proxy(function (t) {
                t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    n.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "ps-nav",
        navClass: ["ps-prev", "ps-next"],
        slideBy: 1,
        dotClass: "ps-dot",
        dotsClass: "ps-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, n.prototype.initialize = function () {
        var e, s = this._core.settings;
        for (e in this._controls.$relative = (s.navContainer ? t(s.navContainer) : t("<div>").addClass(s.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + s.navElement + ">").addClass(s.navClass[0]).html(s.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.prev(s.navSpeed)
            }, this)), this._controls.$next = t("<" + s.navElement + ">").addClass(s.navClass[1]).html(s.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.next(s.navSpeed)
            }, this)), s.dotsData || (this._templates = [t("<div>").addClass(s.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (s.dotsContainer ? t(s.dotsContainer) : t("<div>").addClass(s.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function (e) {
                var i = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(i, s.dotsSpeed)
            }, this)), this._overrides) this._core[e] = t.proxy(this[e], this)
    }, n.prototype.destroy = function () {
        var t, e, s, i;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (i in this.overides) this._core[i] = this._overrides[i];
        for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
    }, n.prototype.update = function () {
        var t, e, s = this._core.clones().length / 2,
            i = s + this._core.items().length,
            n = this._core.maximum(!0),
            r = this._core.settings,
            o = r.center || r.autoWidth || r.dotsData ? 1 : r.dotsEach || r.items;
        if ("page" !== r.slideBy && (r.slideBy = Math.min(r.slideBy, r.items)), r.dots || "page" == r.slideBy)
            for (this._pages = [], t = s, e = 0, 0; i > t; t++) {
                if (e >= o || 0 === e) {
                    if (this._pages.push({
                            start: Math.min(n, t - s),
                            end: t - s + o - 1
                        }), Math.min(n, t - s) === n) break;
                    e = 0, 0
                }
                e += this._core.mergers(this._core.relative(t))
            }
    }, n.prototype.draw = function () {
        var e, s = this._core.settings,
            i = this._core.items().length <= s.items,
            n = this._core.relative(this._core.current()),
            r = s.loop || s.rewind;
        this._controls.$relative.toggleClass("disabled", !s.nav || i), s.nav && (this._controls.$previous.toggleClass("disabled", !r && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !r && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !s.dots || i), s.dots && (e = this._pages.length - this._controls.$absolute.children().length, s.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : 0 > e && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
    }, n.prototype.onTrigger = function (e) {
        var s = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: s && (s.center || s.autoWidth || s.dotsData ? 1 : s.dotsEach || s.items)
        }
    }, n.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, t.proxy(function (t, s) {
            return t.start <= e && t.end >= e
        }, this)).pop()
    }, n.prototype.getPosition = function (e) {
        var s, i, n = this._core.settings;
        return "page" == n.slideBy ? (s = t.inArray(this.current(), this._pages), i = this._pages.length, e ? ++s : --s, s = this._pages[(s % i + i) % i].start) : (s = this._core.relative(this._core.current()), i = this._core.items().length, e ? s += n.slideBy : s -= n.slideBy), s
    }, n.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, n.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, n.prototype.to = function (e, s, i) {
        var n;
        !i && this._pages.length ? (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, s)) : t.proxy(this._overrides.to, this._core)(e, s)
    }, t.fn.psCarousel.Constructor.Plugins.Navigation = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    "use strict";
    var n = function (s) {
        this._core = s, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.ps.carousel": t.proxy(function (s) {
                s.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.ps.navigation")
            }, this),
            "prepared.ps.carousel": t.proxy(function (e) {
                if (e.namespace) {
                    var s = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!s) return;
                    this._hashes[s] = e.content
                }
            }, this),
            "changed.ps.carousel": t.proxy(function (s) {
                if (s.namespace && "position" === s.property.name) {
                    var i = this._core.items(this._core.relative(this._core.current())),
                        n = t.map(this._hashes, function (t, e) {
                            return t === i ? e : null
                        }).join();
                    if (!n || e.location.hash.slice(1) === n) return;
                    e.location.hash = n
                }
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.ps.navigation", t.proxy(function (t) {
            var s = e.location.hash.substring(1),
                i = this._core.$stage.children(),
                n = this._hashes[s] && i.index(this._hashes[s]);
            void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0)
        }, this))
    };
    n.Defaults = {
        URLhashListener: !1
    }, n.prototype.destroy = function () {
        var s, i;
        for (s in t(e).off("hashchange.ps.navigation"), this._handlers) this._core.$element.off(s, this._handlers[s]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.psCarousel.Constructor.Plugins.Hash = n
}(window.Zepto || window.jQuery, window, document),
function (t, e, s, i) {
    function n(e, s) {
        var n = !1,
            r = e.charAt(0).toUpperCase() + e.slice(1);
        return t.each((e + " " + a.join(r + " ") + r).split(" "), function (t, e) {
            return o[e] !== i ? (n = !s || e, !1) : void 0
        }), n
    }

    function r(t) {
        return n(t, !0)
    }
    var o = t("<support>").get(0).style,
        a = "Webkit Moz O ms".split(" "),
        h = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        l = function () {
            return !!n("transform")
        },
        p = function () {
            return !!n("perspective")
        },
        c = function () {
            return !!n("animation")
        };
    (function () {
        return !!n("transition")
    })() && (t.support.transition = new String(r("transition")), t.support.transition.end = h.transition.end[t.support.transition]), c() && (t.support.animation = new String(r("animation")), t.support.animation.end = h.animation.end[t.support.animation]), l() && (t.support.transform = new String(r("transform")), t.support.transform3d = p())
}(window.Zepto || window.jQuery, window, document);