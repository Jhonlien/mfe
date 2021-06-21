import { mount as MarketingMount } from 'marketing_app/MarketingApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = MarketingMount(ref.current, 
        {
            initialPath : history.location.pathname,
            onNavigate : ({ pathname : nextPathname }) => {
                const pathname = history.location
                // console.log(pathname)
                if( pathname !== nextPathname ) history.push( nextPathname )
            },
            onSignIn : () => {
                console.log('Sign in')
            }
        });
        // console.log(onParentNavigate)
        history.listen(onParentNavigate)
    },[])

    return <div ref={ref}/>
}
