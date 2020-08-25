import {handleSubmit} from './js/formHandler'
import {getGNData} from './js/handleGNAPI'
import './styles/style.scss'

export {
    handleSubmit,
    getGNData
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", handleSubmit) 
}); 
