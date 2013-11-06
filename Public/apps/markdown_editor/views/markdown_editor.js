define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/markdown_editor.html'
], function ($, _, Backbone, markdown_editor_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "markdown_editor",
        initialize: function () {
            var base = this;
            base.events = $.extend({}, Backbone.Events);
            base.original_value = "";
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(markdown_editor_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate('textarea', 'keydown', function (e) {
                var keyCode = e.keyCode;

                if (keyCode == 9) {
                    e.preventDefault();
                    var start = $(this).get(0).selectionStart;
                    var end = $(this).get(0).selectionEnd;

                    // set textarea value to: text before caret + tab + text after caret
                    $(this).val($(this).val().substring(0, start)
                        + "\t"
                        + $(this).val().substring(end));

                    // put caret at right position again
                    $(this).get(0).selectionStart =
                        $(this).get(0).selectionEnd = start + 1;
                }
            });

            var timer = 0;


            base.$el.delegate("textarea", 'keyup', function (e) {
                clearTimeout(timer);
                var elt = $(this);


                timer = setTimeout(function () {
                    var text = elt.val();
                    base.$el.find(".result").html(
                        SmartBlocks.Blocks.Markdown.Main.convertToHTML(text)
                    );
                }, 100);


                base.events.trigger('changed');

            });
        },
        hasChanged: function () {
            var base = this;
            var elt = base.$el.find('textarea');
            return elt.val() != base.original_value;
        },
        getMarkdown: function () {
            var base = this
            return base.$el.find("textarea").val();
        },
        getHtml: function () {
            var base = this;
            var text = base.$el.find("textarea").val();
            var html = SmartBlocks.Blocks.Markdown.Main.convertToHTML(text);
            return html;
        },
        show: function () {
            var base = this;
            var div = $(document.createElement("div"));
            div.addClass("markdown_editor_cache");
            div.append(base.$el);
            $("body").append(div);
        },
        hide: function () {
            var base = this;
            base.$el.remove();
        },

        setContent: function (content) {
            var base = this;
            base.$el.find("textarea").html(content);
            base.$el.find(".result").html(
                SmartBlocks.Blocks.Markdown.Main.convertToHTML(content)
            );
            base.original_value = content;
        },
        addAction: function (name, callback) {
            var base = this;

            var button = $(document.createElement('a'));
            button.addClass('pure-button');
            button.attr('href', 'javascript:void(0);');
            button.html(name);
            base.$el.find(".actions").append(button);
            button.click(function () {
                callback(base);
            });
        }
    });

    return View;
});