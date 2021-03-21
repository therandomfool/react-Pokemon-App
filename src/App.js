import React, {
  useState,
  useEffect
} from 'react';
import PokemanList from './PokemanList';
import axios from 'axios';
import Pagination from './Pagination'



function App() {
  const [pokeman, setPokeman] = useState([])
  const [ currentPageUrl, setCurrentPageUrl] = useState(" https://pokeapi.co/api/v2/pokemon")
  const [ nextPageUrl, setNextPageUrl] = useState()
  const [ prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel=c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokeman(res.data.results.map(p => p.name))
    });
    return () => cancel();
  }, [currentPageUrl])

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading........................"


  return ( 
    <>
      <PokemanList pokeman = {pokeman}/>
      <Pagination 
        gotoNextPage = {nextPageUrl ? gotoNextPage : null}
        gotoPrevPage = {prevPageUrl ? gotoPrevPage: null}
      />
    </>

  );
}

export default App;