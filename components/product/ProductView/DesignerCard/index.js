import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './styles.module.scss'

const DesignerCard = ({ cid }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://digitalax.mypinata.cloud/ipfs/${cid}`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!data) {
    return null
  }

  return (
    <div className={cn(styles.wrapper)}>
      <a>
        <img
          src={data['image_url']}
          alt={data['Designer ID']}
          className={styles.photo}
        />
      </a>
    </div>
  )
}

DesignerCard.propTypes = {
  cid: PropTypes.string,
}

DesignerCard.defaultProps = {
  cid: '',
}

export default memo(DesignerCard)
