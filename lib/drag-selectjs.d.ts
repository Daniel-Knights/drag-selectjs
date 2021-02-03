declare module 'drag-selectjs' {
    interface DragSelect {
        init: (dragBoxClass?: string, selectedClass?: string) => void
        onSelected: (cb: () => unknown) => void
    }
}
