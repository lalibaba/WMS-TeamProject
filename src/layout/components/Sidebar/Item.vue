<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    } else {
      vnodes.push(<i class='dot'><svg-icon class='svg' icon-class='yuandian'/> <span class='shuxian'></span> </i>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.dot{
  display: inline-block;
  position: relative;
    margin-right: 16px;
      width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 50px;
    .svg{
      position: absolute;
    left: -4px;
    top: -13px;
    width: 50px;
    height: 41px;
    margin: 0;
    }
    .shuxian{
      border-left: 1px solid #d9d0cf;
    border-right: 0;
    position: absolute;
    top: -27px;
    height: 22px;
    left: 20px;
    }
}
</style>
