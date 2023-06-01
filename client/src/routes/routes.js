import AddImage from "../pages/AddImage";
import Images from "../pages/Images";
import MainRoot from "../pages/MainRoot";

export const ROUTES = [
    {
        path:'',
        element: <MainRoot/>,
        children: [
            {
                path: '/',
                element: <Images/>
            },
            {
                path:'/add-image',
                element: <AddImage/>
            }
        ]
    }
    
]