import {TAbstractFile, TFile} from 'obsidian';
import DustCalendarPlugin from "../main";
import Path from "./Path";


/**
 * 模板工具的基类，用于统一不同模板插件的行为
 */
export default class TemplateUtil {

    public readonly plugin: DustCalendarPlugin;

    constructor(plugin: DustCalendarPlugin) {
        this.plugin = plugin;
    }

    /**
     * 判断指定的模板插件是否启用了
     */
    public isEnable(): boolean {
        return false;
    }

    /**
     * 获取模板文件夹
     */
    public getTemplateFolder(): Path {
        return new Path("");
    }

    /**
     * 读取模板文件内容并做基础变量替换，返回渲染后的内容
     */
    public async getRenderedContent(templateFile: TAbstractFile, noteFilename: string): Promise<string> {
        if (!(templateFile instanceof TFile)) {
            return "";
        }
        const raw = await this.plugin.app.vault.cachedRead(templateFile);
        return this.replaceVariables(raw, noteFilename);
    }

    protected replaceVariables(content: string, noteFilename: string): string {
        return content;
    }

    /**
     * 文件创建后的后处理（如 Templater 需要解析 tp.xxx 语法）
     */
    public async postProcess(file: TFile): Promise<void> {
    }

    /**
     * @deprecated 旧方法，向活跃编辑器插入模板
     */
    public insertTemplateImpl(templateFile: TAbstractFile) {

    }

}