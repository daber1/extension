import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_todo extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_todo:plugin',
  description: 'Pop up your to-do\'s in opened notebook.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_todo is activated!');
  }
};

export default plugin;
