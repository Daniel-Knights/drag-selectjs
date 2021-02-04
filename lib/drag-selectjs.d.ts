declare module 'drag-selectjs' {
    /**
     * Initialises drag-select.
     * @param dragBoxClass - Class applied to the drag-box.
     * @param selectedClass - Class applied to any selected elements.
     */
    export function init(dragBoxClass?: string, selectedClass?: string): void

    /**
     * Callback which is fired each time any elements are selected.
     * @param cb - Callback to be run. Is passed a single parameter which is an array of selected elements.
     * @example
     * onSelected(selected => {
     *   console.log(selected) // [div.__dragselect--selected]
     * })
     */
    export function onSelected(cb: () => unknown): void
}
