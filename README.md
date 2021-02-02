# drag-selectjs ⚡️

> _Make any element selectable with just a few lines of code_ 👊

-   Lightweight ☁️
-   Easy to use 🌞
-   Compatible with any frontend framework 🔥

## Installation

### CLI

```bash
npm i drag-select
```

or...

```bash
yarn add drag-select
```

### CDN

```html
<script src="https://unpkg.com/drag-selectjs"></script>
```

## Usage

### CLI

```js
import { init, onSelected } from 'drag-select'

init('drag-box-class', 'selected-element-class') // Arguments are optional

onSelected(selected => {
    console.log(selected) // [div.selected-element-class, ...]
})
```

### CDN

```js
DragSelect.init()

DragSelect.onSelected(selected => {
    console.log(selected)
})
```

---

**Contributions welcome!**
