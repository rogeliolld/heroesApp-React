import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { DcScreen } from '../components/dc/DcScreen'
import { HeroeScreen } from '../components/heroes/HeroeScreen'
import { MarvelScreen } from '../components/marvel/MarvelScreen'
import { SearchScreen } from '../components/search/SearchScreen'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <div>
            <>
                <Navbar/>
                <div className="container mt-2">
                    <Switch>
                        <Route exact path="/marvel" component={MarvelScreen} />
                        <Route exact path="/hero/:heroeId" component={HeroeScreen} />
                        <Route path="/dc" component={DcScreen} />
                        <Route path="/search" component={SearchScreen} />

                        <Redirect to="/marvel"/>
                    </Switch>
                </div>
            </>
        </div>
    )
}
