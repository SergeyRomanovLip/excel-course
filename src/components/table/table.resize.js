import {$} from '../../core/dom'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest(
      '[data-type="resizable"]'
    )
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    const colId = $parent.data.col

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px',
        })
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px',
        })
      }
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $parent.css({
        width: value + 'px',
      })

      if (type === 'col') {
        $root
          .findAll(`[data-col="${colId}"]`)
          .forEach(element => {
            element.style.width = value + 'px'
          })
      } else {
        $parent.css({
          height: value + 'px',
        })
      }

      resolve({
        value,
        type,
        id: type === 'col' ? $parent.data.col : $parent.data.row
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: -2 + 'px',
      })
    }
  })
}