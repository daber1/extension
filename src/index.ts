import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab_todo extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_todo',
  description: 'Pop up your to-do\'s in opened notebook.',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette:ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_todo is activated!');
    

    // A widget creator function
    const newWidget = () => {
      const content = new Widget();
      const widget = new MainAreaWidget({ content });
      widget.id = 'todo-jupyterlab';
      widget.title.label = 'Random Picture';
      widget.title.closable = true;
      return widget;
    }
    let widget = newWidget();

    const command: string = 'todo:open';
    app.commands.addCommand(command, {
      label: 'Random Picture',
      execute: () => {
        if (widget.isDisposed) {
          widget = newWidget();
        }
        if (!widget.isAttached){
          // Attach the widget to the main area
          app.shell.add(widget,'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });
    palette.addItem({ command,category:'Tutorial'});
  }

  
};

export default plugin;
