

class ProjectileCombiner {
    // Instance variables
    panel: Panel;

    // ExampleUI constructor
    constructor(panel: Panel) {
        this.panel = panel;
        $.Msg(panel); // Print the panel
    }
}

let ui = new ProjectileCombiner($.GetContextPanel());

$.Msg("ProjectileCombiner Loaded")
