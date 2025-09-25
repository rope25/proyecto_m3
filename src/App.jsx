
import Listas from './components/Listas/Listas'
import MyClients from './components/MyClients'
import styles from 'App.css'

function App() {
  return (

 <main className="background">
    <header>
  <Listas />
  <MyClients />
</header>

<img src="avatar" alt="ima" />
  {/* <section class="row mb-4"> */}
    <div>
      <h2 class="text-primary">Bienvenidos</h2>
      <p>Explora las funcionalidades básicas de Bootstrap 5 con este ejemplo sencillo.</p>
    </div>
  {/* </section> */}

</main>



  )

}


export default App

