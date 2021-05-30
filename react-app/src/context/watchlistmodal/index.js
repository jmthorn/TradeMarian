// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import { useDispatch, useSelector } from "react-redux";


// function WatchlistModal({ ticker_symbol }) {
//   const dispatch = useDispatch();
//   const [showModal, setShowModal] = useState(false);


//   return (
//     <div className='watchlist-modal-container'>
//       <button onClick={() => setShowModal(true)}>+ Add to Lists</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           {watchlist_arr.map((watchlist) => (
//                 <a href={`/watchlists/${watchlist.watchlist.id}`}>
//                     <div className="watchlist-container">
//                         <p>{watchlist?.watchlist.watchlist_name}</p>
//                         <input type="radio" checked={checked === watchlist?.watchlist.id} onChange={() => setChecked(watchlist?.watchlist.id)} name="watchlist"></input>
//                     </div>
//                 </a>
//             ))}
//           {/* <form>
//               <h3>Add {ticker_symbol} to Your Lists</h3>
//               <button >Save Changes</button>
//           </form> */}
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default WatchlistModal;
