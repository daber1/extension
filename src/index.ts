import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker
} from '@jupyterlab/notebook';

import { NotebookPanel } from '@jupyterlab/notebook';
import { Notification } from '@jupyterlab/apputils';

// Create a new command for your extension
const TODO_COMMAND: string = 'jupyterlab_todo:check-todos';



/**
 * Initialization data for the jupyterlab_todo extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_todo',
  description: 'Pop up your to-do\'s in opened notebook.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension jupyterlab_todo is activated!');
    const checkForTodos = async () => {
      // Open notebook
      const currentNotebook = tracker.currentWidget as NotebookPanel;
      if (!currentNotebook.context.contentsModel?.name) return;
      // const cellList = currentNotebook.content.widgets;
      const cellList = currentNotebook.content.model?.cells
      if (!cellList) return;

      for (let index = 0; index < cellList.length; index++){
        const cell = cellList.get(index);
        const cellJson = cell.toJSON();
        const cellText = Array.isArray(cellJson.source) ? cellJson.source.join('\n') : cellJson.source; 
        const todoMatches = cellText.match(/TODO:|todo:|To do|ToDo/gi);
        if (todoMatches && todoMatches.length > 0) {
          console.log(cellJson);
          Notification.emit(`Found TODOs in the current notebook`, "warning", {autoClose: 3000, actions: [
            { label: 'Go to', callback: () => {
              currentNotebook.content.activeCellIndex = index;
              if (currentNotebook.content.activeCell){
                currentNotebook.content.activeCell.activate()
                currentNotebook.content.scrollToCell(currentNotebook.content.activeCell);
              }
            } }
          ],});  
          break;
          }
        }
    }
    tracker.currentChanged.connect(() => {
      checkForTodos();
    });
    app.commands.addCommand(TODO_COMMAND, {
      label: 'Check for TODOs',
      execute: checkForTodos,
      isVisible: () => tracker.currentWidget !==null
    });

    app.commands.addKeyBinding({
      command: TODO_COMMAND,
      keys: ['Ctrl Y'],
      selector: '.jp-Notebook'
    });
    
  }

  
};

export default plugin;
