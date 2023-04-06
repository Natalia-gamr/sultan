import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import '../../styles/globals.css'
import { useAppDispatch } from '../../hooks/redux';
import { fetchFilters } from '../../store/actions/filtersActions';

import { AppHeader } from '../AppHeader/AppHeader';
import { Catalog } from '../pages/Catalog/Catalog';
import { Cart } from '../pages/Cart/Cart';
import { SingleProduct } from '../pages/SingleProduct/SingleProduct';
import { Main } from '../pages/Main/Main';
import { Admin } from '../pages/Admin/Admin';
import { AppFooter } from '../AppFooter/AppFooter';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFilters())
  }, [dispatch])

  return (
    <>

      <HashRouter>
        <AppHeader />
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path={"/admin"} element={<Admin />} />
          <Route path={"/catalog"} element={<Catalog />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/catalog/:barecode"} element={<SingleProduct />} />
        </Routes>
        <AppFooter />
      </HashRouter>
    </>
  );
}

export default App;
