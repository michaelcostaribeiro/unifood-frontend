import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <header className="bg-primary p-3 pt-5 shadow-xs">
        <nav className="flex flex-col gap-5">
            <div>
                  <div className="flex justify-between">
                      <div className="flex gap-2">
                          <Link to='/' className="bg-secondary text-primary px-4 py-3 text-xl font-bold rounded-2xl">U</Link>
                          <div>
                            <h1 className="font-extrabold text-secondary text-xl">Unifood</h1>
                              <p className="text-black-transparent"><FontAwesomeIcon icon={faLocationDot} />Cantina Unifood</p>
                          </div>
                      </div>

                      <div className="flex items-center">
                          <p className="text-black-transparent">Olá, luana </p>👋
                          <Link to='/' className="bg-black-transparent rounded-full h-9 w-9 flex items-center justify-center" ><FontAwesomeIcon icon={faBell}  /></Link>
                      </div>
                  </div>
            </div>
            <div>
                  <div className="bg-ternary p-2 text-black-transparent rounded-2xl flex items-center  focus-within:ring-2 ring-black-transparent-25">

                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" name="search" id="search" className="p-1 flex-1 focus:outline-0" placeholder="Buscar restaurante ou prato..."  />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar