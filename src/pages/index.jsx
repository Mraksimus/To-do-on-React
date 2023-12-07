import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Todo } from './Todo.jsx'
import { Page404 } from './Page404'

export const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/" element={<Todo />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
