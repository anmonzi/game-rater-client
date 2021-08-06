import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider"
import { GameList } from "./game/GameList"
import { GameDetail } from "./game/GameDetail"
import { GameForm } from "./game/GameForm"
import { CategoryProvider } from "./category/CategoryProvider"
import { ReviewProvider } from "./review/ReviewProvider"
import { ReviewForm } from "./review/ReviewForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <GameProvider>
                <CategoryProvider>
                    <ReviewProvider>
                        <Route exact path="/games">
                            <GameList />
                        </Route>

                        <Route exact path="/games/detail/:gameId(\d+)">
                            <GameDetail />
                        </Route>

                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>

                        <Route exact path="/games/:gameId(\d+)/review">
                            <ReviewForm />
                        </Route>
                    </ReviewProvider>
                </CategoryProvider>
            </GameProvider>
            
        </main>
    </>
}
