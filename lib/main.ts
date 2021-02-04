let onSelectedCallback: (els: Element[]) => unknown

/**
 * Callback which is fired each time any elements are selected.
 * @param cb - Callback to be run. Is passed a single parameter which is an array of selected elements.
 * @example
 * onSelected(selected => {
 *   console.log(selected) // [div.__dragselect--selected]
 * })
 */
export function onSelected(cb: () => unknown): void {
    onSelectedCallback = cb
}

/**
 * Initialises drag-select.
 * @param dragBoxClass - Class applied to the drag-box.
 * @param selectedClass - Class applied to any selected elements.
 */
export function init(
    dragBoxClass = '__dragselect--box',
    selectedClass = '__dragselect--selected'
): void {
    const dragBox = document.createElement('div')
    const stylesheet = document.createElement('style')
    const selectableEls = document.querySelectorAll('[data-dragselect]')
    const coords = { pageX: 0, pageY: 0, clientX: 0, clientY: 0 }

    let selectedEls: Element[] = []
    let dragging: boolean

    dragBox.className = dragBoxClass

    // Minify CSS
    function minify(styles: string) {
        let selector = false
        let value = false

        const minified = styles
            .split('')
            .map(char => {
                // Retain spaces between selectors
                // Determine start of selector
                if ((char === '.' || char === '@' || char === '#') && !value)
                    selector = true
                // Determine end of selector
                if (selector && (char === ',' || char === '{')) selector = false

                // Retain spaces between rules with multiple values
                if (char === ':' && !selector) value = true
                if (char === ';' && !selector) value = false

                // Replace spaces and line-breaks
                if (
                    (char === ' ' || char === '\n' || char === '\r') &&
                    !selector &&
                    !value
                )
                    return ''

                return char
            })
            .join('')
            .split(' {')
            .join('{')
            .split(': ')
            .join(':')

        return minified
    }

    function resizeDragBox(e: MouseEvent) {
        if (!dragging || e.pageX < 0 || e.pageY < 0) return

        const { pageX, pageY } = e
        const { pageX: coordsX, pageY: coordsY } = coords
        const width = pageX - coordsX
        const height = pageY - coordsY

        if (dragBox.style.opacity !== '1') {
            dragBox.style.opacity = '1'
        }

        if (width < 0) {
            dragBox.style.left = pageX + 'px'
            dragBox.style.width = Math.abs(width) + 'px'
        } else {
            dragBox.style.left = coordsX + 'px'
            dragBox.style.width = width + 'px'
        }

        if (height < 0) {
            dragBox.style.top = pageY + 'px'
            dragBox.style.height = Math.abs(height) + 'px'
        } else {
            dragBox.style.top = coordsY + 'px'
            dragBox.style.height = height + 'px'
        }
    }

    function detectSelection() {
        const dragRect = dragBox.getBoundingClientRect()

        if (
            !dragging ||
            !dragRect.left ||
            !dragRect.top ||
            !dragRect.bottom ||
            !dragRect.right
        )
            return

        document.body.classList.add('__dragselect--dragging')

        selectableEls.forEach(el => {
            const elRect = el.getBoundingClientRect()

            const toBottomRight =
                coords.clientX < elRect.right &&
                coords.clientY < elRect.bottom &&
                dragRect.right > elRect.left &&
                dragRect.bottom > elRect.top

            const toBottomLeft =
                coords.clientX > elRect.left &&
                coords.clientY < elRect.bottom &&
                dragRect.left < elRect.right &&
                dragRect.bottom > elRect.top

            const toTopLeft =
                coords.clientX > elRect.left &&
                coords.clientY > elRect.bottom &&
                dragRect.left < elRect.right &&
                dragRect.top < elRect.bottom

            const toTopRight =
                coords.clientX < elRect.right &&
                coords.clientY > elRect.bottom &&
                dragRect.right > elRect.left &&
                dragRect.top < elRect.bottom

            if (toBottomRight || toBottomLeft || toTopLeft || toTopRight) {
                if (!selectedEls.includes(el)) {
                    selectedEls.push(el)
                }

                if (![...el.classList].includes(selectedClass)) {
                    el.classList.add(selectedClass)
                }
            } else {
                selectedEls = selectedEls.filter(selectedEl => el !== selectedEl)
                el.classList.remove(selectedClass)
            }
        })
    }

    function mouseDownHandler(e: MouseEvent) {
        dragging = true
        coords.pageX = e.pageX
        coords.pageY = e.pageY
        coords.clientX = e.clientX
        coords.clientY = e.clientY

        selectableEls.forEach(el => el.classList.remove(selectedClass))
        selectedEls = []
    }

    function mouseMoveHandler(e: MouseEvent) {
        resizeDragBox(e)
        detectSelection()
    }

    function mouseUpHandler() {
        dragging = false
        dragBox.removeAttribute('style')

        if ([...document.body.classList].includes('__dragselect--dragging')) {
            document.body.classList.remove('__dragselect--dragging')
        }

        if (selectedEls.length) {
            onSelectedCallback(selectedEls)
        }
    }

    function appendStylesheet() {
        stylesheet.type = 'text/css'
        stylesheet.id = '__drag-select-stylesheet'
        stylesheet.innerHTML = minify(`
            body.__dragselect--dragging {
                user-select: none;
            }            
            .${dragBoxClass} {
                position: absolute;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.5);
                opacity: 0;
            }
        `)

        document.head.appendChild(stylesheet)
    }

    if (!document.getElementById('__drag-select-stylesheet')) {
        appendStylesheet()
    }

    document.body.appendChild(dragBox)
    document.addEventListener('mousedown', mouseDownHandler)
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
}
