export default juiceToast;
export namespace juiceToast {
    let _config: {};
    let _queue: any[];
    let _showing: boolean;
    let _theme: string;
    let _plugins: any[];
    function setup(e?: {}): void;
    function use(e: any): void;
    function addType(e: any, t?: {}): void;
    function defineTheme(e: any, t?: {}): void;
    function setTheme(e: any): void;
    function clear(): void;
    function destroy(): void;
    function _registerTypes(): void;
    function _enqueue(e: any, t: any): void;
    function _next(): void;
    function _runPlugins(e: any): void;
    function _normalizeGlass(e: any): number;
    function _getRoot(e?: string): HTMLElement;
    namespace _defaults {
        let duration: number;
        let maxVisible: number;
        let swipeThreshold: number;
        let glassUI: number;
        let playSound: any;
        let dev: boolean;
        let injectCSS: boolean;
        let css: any;
    }
    function _warn(e: any): void;
    function _playSound(e: any): void;
    function _showToast(e: any, t: any): void;
}
