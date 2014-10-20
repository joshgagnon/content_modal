(function($) {
    var plugin_name = 'context_modal';
    var percentage;
    var methods = {
        init: function(options) {
            options = options || {};
            var self = this;
            return this.each(function() {
                var $this = $(this),
                    data = $this.data(plugin_name),
                    overflow;
                // If the plugin hasn't been initialized yet
                if (!data) {
                    var divs = [];
                    var modal = $('<div/>')
                        .css({
                            'position': 'absolute',
                            'top': 0,
                            'bottom': 0,
                            'left': 0,
                            'right': 0,
                            'zIndex': 6000,
                            //'backgroundColor': 'green'// for debugging
                        }),
                        zIndex = $this.css('zIndex');
                    modal.addClass('context_modal');
                    if (options.className) {
                        modal.addClass(options.className);
                    }
                    self.css('zIndex', 6010);

                    divs.push(modal);
                    modal.on('click mousedown touchstart mousewheel DOMMouseScroll', function() {
                        methods.destroy.call($this);
                        if (options.callback)
                            options.callback();
                    });
                    $('body').append(modal);

                    $this.data(plugin_name, {
                        target: $this,
                        divs: divs,
                        options: options,
                        zIndex: zIndex
                    });

                }
            });
        },
        destroy: function() {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data(plugin_name);
                if (data) {
                    $this.css('zIndex', data.zIndex);
                    $(data.divs).each(function(i, e) {
                        $(e).off();
                        e.remove();
                    });
                    $this.removeData(plugin_name);
                }
            });
        }
    };

    $.fn[plugin_name] = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist');
        }
    };

})(jQuery);
