import { useState, useEffect, ChangeEvent } from 'react'
import api  from '../services/api'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MdSearch, MdAdjust} from "react-icons/md";
import styles from '../styles/components/Search.module.css'

interface Category {
  id: number,
  name: string
}

interface Advertising {
  id: number,
  title: string,
  description: string,
  value: number,
  images_advertisings: [{
    id: number,
    id_advertising: number,
    image: string
  }]
}


export default function Search() {
  const [categorys, setCategorys] = useState<Category[]>([])
  const [advertisings, setAdvertisings] = useState<Advertising[]>([])
  const [possiblesAdvertisings, setPossiblesAdvertisings] = useState<Advertising[]>([])
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const readAdvertisingsRecents = async () => {
      const response = await api.get('/advertisings?limit=8')
      const data = response.data
      setAdvertisings(data)
    }
    readAdvertisingsRecents()
  }, [])

  useEffect(() => {
    const readCategorys = async () => {
      const response = await api.get('/categorys')
      const data = response.data
      setCategorys(data)
    }
    readCategorys()
  }, [])

  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setQuery(value)

    if (value.trim() === '') {
      return setPossiblesAdvertisings([])
    }
    const regexp = new RegExp(`^${value}`, 'i')

    const filterAdvertisings = advertisings.filter((advertising) => {
      return regexp.test(advertising.title)
    })
    setPossiblesAdvertisings(filterAdvertisings)
  }

  const selectedAdvertising = async (titleAdvertising: string) => {
    setPossiblesAdvertisings([])
    router.push(`/advertisings/${titleAdvertising}`)

  }

  const withoutSelectedAdvertisings = async () => {
    if(query.trim() !== ''){
        router.push(`/advertisings/${query}`)
    }
  }

  return (  
    <div className={styles.box_shop}>
      <div className={styles.box_content}>
        <form className={styles.form} onSubmit={withoutSelectedAdvertisings}>
          <div className={styles.box_search}>
            <input 
              onChange={changeSearch} 
              className={styles.search} 
              placeholder="Estou procurando por.."
            />
            <a className={styles.button_search} onClick={withoutSelectedAdvertisings}>
              <MdSearch size="30"/>
            </a>
          </div>
        </form>
        <div className={styles.box_list_advertisings}>
          {possiblesAdvertisings.length > 0 && possiblesAdvertisings.map((advertising) => (
            <div className={styles.box_advertising}>
              <a 
                className={styles.item_advertising}
                onClick={() => selectedAdvertising(advertising.title)}
              >
                {advertising.title}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.box_categorys}>
        {categorys.length > 0 && categorys.map((category) => (
          <Link href={`/advertisings/category/${category.name}/${category.id}`}>
            <div className={styles.box_category}>
              <div className={styles.icon_category}>
                <p><MdAdjust size="20"/></p>
              </div>
              <p className={styles.title_category}>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}