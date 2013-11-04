define([
    'jquery',
    'underscore',
    'backbone',
    './apps/markdown_editor/views/markdown_editor',
    './libs/markdown'
], function ($, _, Backbone, EditorView) {
    var main = {
        init: function () {


        },
        showEditor: function () {
            var editor = new EditorView();
            editor.show();
            editor.init();
            return editor;
        },
        getEditor: function () {
            return new EditorView();
        },
        convertToHTML: function (text) {
            return (Markdown.toHTML(text));
        }
    };

    return main;
});