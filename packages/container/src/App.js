import React, { lazy, Suspense, useState } from 'react'

import Header from './components/Header'
import MarketingApp from './components/MarketingApp'
import AuthApp from './components/AuthApp'
import Progress from './components/Progress'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

const MarketingLazy = lazy( () => import('./components/MarketingApp'))
const AuthLazy = lazy( () => import('./components/AuthApp'))

const generateClassName = createGenerateClassName({
    productionPrefix: 'c'
})

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        <React.Fragment>
            <StylesProvider generateClassName={generateClassName}>
                <BrowserRouter>
                    <Suspense fallback={<Progress/>}>
                        <Header isSignedIn={isSignedIn}/>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignin={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </StylesProvider>
        </React.Fragment>
    )
}