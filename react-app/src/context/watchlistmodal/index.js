import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
// import './watchlistmodal.css';

function WatchlistModal({ ticker_symbol }) {
//   const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
//   const history = useHistory();
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='modal'>
      <button onClick={() => setShowModal(true)}>
        Add to List
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form>
              <h3>Add {ticker_symbol} to Your Lists</h3>
              <button >Save Changes</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default WatchlistModal;