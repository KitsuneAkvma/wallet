import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const routerConfig = createBrowserRouter([{ path: '/', element: <div>hello</div> }]);

const Router = () => {
  return <RouterProvider router={routerConfig} />;
};

export default Router;
