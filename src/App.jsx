import OrderCard from './components/OrderCard';
import IngredientCard from './components/IngredientCard';
import OvenCard from './components/OvenCard';
import Deck from './components/Deck';

function App() {
  const test = 'green';

  return (    
    <>
    <div className='flex justify-center items-center h-screen gap-5'>
      <IngredientCard color={test}/>
      <OrderCard color="red" type="normale2" extra={test}/>
      <OvenCard />
      <Deck />
    </div>
    </>
  )
}

export default App;