# drag-selectjs ⚡️

> _Make any element selectable with just a few lines of code_ 👊

-   Lightweight ☁️
-   Easy to use 🌞
-   Compatible with any frontend framework 🔥

[CodePen Demo](https://codepen.io/daniel-knights/pen/BaQNvym)

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

First, add the `data-dragselect` attribute to any element you want to make selectable:

```html
<div data-dragselect>SELECT ME!</div>
```

Then, add any styling for the drag-box and selected elements:

```css
/* Class-names can be changed with `init('drag-box-class', 'selected-element-class')` */
.__dragselect--box {
    background-color: rgba(0, 0, 0, 0.5);
}
.__dragselect--selected {
    border: 3px solid #808080;
}
```

Now, all you need to do is initialise **`drag-selectjs`**:

### CLI

```js
import { init, onSelected } from 'drag-selectjs'

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
