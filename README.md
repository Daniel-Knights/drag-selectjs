# drag-selectjs ⚡️

> _Make any element selectable with just a few lines of code_ 👊

-   Lightweight ☁️
-   Easy to use 🌞
-   Compatible with any frontend framework 🔥

## Installation

```bash
npm i drag-selectjs
```

or...

```bash
yarn add drag-selectjs
```

## Usage

```js
import { dragSelect, onSelected } from 'drag-selectjs'

dragSelect('drag-box-class', 'selected-element-class') // Arguments are optional

onSelected(selected => {
    console.log(selected) // [div.selected-element-class, ...]
})
```

---

**Contributions welcome!**
