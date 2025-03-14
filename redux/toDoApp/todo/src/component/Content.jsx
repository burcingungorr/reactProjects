import React from 'react'
import ContentFooter from './ContentFooter'

const Content = () => {
  return (
    <div> 
    <section className="main">
    <input className="toggle-all" type="checkbox" />
    <label htmlfor="toggle-all">
        Mark all as complete
    </label>
</section>
<ContentFooter/>

</div>
  )
}

export default Content