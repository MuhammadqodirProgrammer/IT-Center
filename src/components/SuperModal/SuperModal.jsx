import React from 'react'
import "./SuperModal.scss";
import CloseModal from '../../assets/image/closeModal.svg'
const SuperModal = ({children, boolen, height,minHeight, set, maxWidth, cancel= true}) => {
  return (
    <div className='super_modal'>
        <section className="myModals" id='myModal' aria-labelledby="contained-modal-title-vcenter">
                <div className="myModal__rel" style={{height, maxWidth, minHeight}}>
                { cancel &&
                    <div
                        className="myModals__close"
                        hidden={boolen}
                        onClick={() => set(false)}
                    >
                        <img src={CloseModal} alt="img" />
                    </div>
                }
                    <div className="myModal_item">
                        {children}
                    </div>
                </div>
            </section>
        <div className="myModal__exit"></div>
    </div>
  )
}

export default SuperModal