declare module 'drag-selectjs' {
    function init(dragBoxClass?: string, selectedClass?: string): void
    function onSelected(cb: () => unknown): void

    export { init, onSelected }
}
