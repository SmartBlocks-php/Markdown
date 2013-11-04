Markdown Block
----------------

This block is a SmartBlocks Framework plugin. It allows converting markdown to HTML, and contains a simple editor app.

This block uses [evilstreak's markdown.js library][1].

------------

**Installation**

You need an up and running SmartBlocks Framework instance.

For more info go on [SmartBlocks's core github page][2].

Download the latest release, and drop the folder into SmartBlocks' Plugins folder.

----------------------
**Simple Usage**

Once the block is installed, you'll have access to the following main methods :

*Simple conversion* 

    SmartBlocks.Blocks.Markdown.Main.convertToHTML(text);
This methods just returns HTML code from the markdown formatted variable `text`.

---------------

**Simple markdown editor**

To get a Backbone View containing a simple editor, and add it in the dom as a popup, just call :

    var editor = SmartBlocks.Blocks.Markdown.Main.showEditor();

This method returns the view.

You can then call the following methods on the editor :

    editor.getMarkdown();
    
This method returns the raw markdown text.

    editor.getHTML();
    
This method returns the text converted in HTML.
     
    editor.addAction("Action Name", function (editor) {
        //some actions
    }):
This method adds a button at the bottom of the editor. Clicking on the button will call the passed callback.

> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: https://github.com/evilstreak/markdown-js/releases
  [2]: https://github.com/SaltySoft/SmartBlocksCore
