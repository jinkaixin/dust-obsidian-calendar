import {TAbstractFile} from 'obsidian';
import DustCalendarPlugin from "../main";
import Path from "./Path";
import TemplateUtil from "./TemplateUtil";


export default class ObsidianTemplateUtil extends TemplateUtil {

    constructor(plugin: DustCalendarPlugin) {
        super(plugin);
    }

    public isEnable(): boolean {
        let pluginList = (this.plugin.app as any).internalPlugins.plugins;
        return Object.keys(pluginList).includes("templates");
    }

    public getTemplateFolder(): Path {
        return new Path((this.plugin.app as any).internalPlugins.plugins.templates.instance.options.folder);
    }

    protected replaceVariables(content: string, noteFilename: string): string {
        const now = window.moment();
        const dateFormat = (this.plugin.app as any).internalPlugins.plugins.templates?.instance?.options?.dateFormat || "YYYY-MM-DD";
        const timeFormat = (this.plugin.app as any).internalPlugins.plugins.templates?.instance?.options?.timeFormat || "HH:mm";
        return content
            .replace(/\{\{\s*title\s*\}\}/gi, noteFilename)
            .replace(/\{\{\s*date\s*\}\}/gi, now.format(dateFormat))
            .replace(/\{\{\s*time\s*\}\}/gi, now.format(timeFormat));
    }

    public insertTemplateImpl(templateFile: TAbstractFile) {
        let templatesPlugin = (this.plugin.app as any).internalPlugins.plugins.templates;
        templatesPlugin.instance.insertTemplate(templateFile);
    }


}