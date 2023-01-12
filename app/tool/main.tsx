import { render } from "common/utils/index"
import "./style.scss"

function Home() {
  return (
    <div>
      <h3 className="py-20">hello next</h3>
      <div className="i-ph-anchor-simple-thin"></div>
      <div className="i-mdi-alarm text-orange-400 text-2xl"></div>
    </div>
  )
}

render(<Home />)
