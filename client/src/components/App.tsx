
//import { IProductListProps } from '../model/IProductListProps';
import Header from './Header';
import CssBaseLine from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';

function App() {


  return (
    <>
      <CssBaseLine />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}







export default App;
