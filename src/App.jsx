import OrderCard from './components/OrderCard';
import IngredientCard from './components/IngredientCard';

function App() {
  const test = 'yellow';

  return (    
    <>
    <div className='flex justify-center items-center h-screen gap-5'>
      <IngredientCard color={test}/>
      <OrderCard color="purple" type="normale" extra={test}/>
    </div>
    </>
  )
}

export default App;