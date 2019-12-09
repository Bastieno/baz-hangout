export default {
  bind(el, binding) {
    const message = binding.value || 'Are u sure you want to continue?'
    const color = binding.arg || 'blue'

    el.style.color = color
    el.style.borderColor = color

    el.__withWarning__ = () => {
      alert(message)
    }

    el.addEventListener('click', el.__withWarning__)
  },
  unbind(el) {
    el.removeEventlistener('click', el.__withWarning__)
  }
}
