import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";

const prizes = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];
const numSegments = prizes.length;

const App = () => {
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const fetchDataAndSpin = () => {
    setLoading(true);
    setError(null);
    setIsWheelSpinning(true);
    setSelectedPrize(null);

    axios
      .get("http://localhost:3000/gifts") // Replace this URL with your API endpoint
      .then((response) => {
        setLoading(false);
        // Check if the response data exists and is an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Select a random item from the response data
          const randomIndex = Math.floor(Math.random() * response.data.length);
          const randomItem = response.data[randomIndex];

          // Spin the wheel after fetching the data
          const randomDegree = 360 * 5 + Math.floor(Math.random() * 360);
          setTimeout(() => {
            setIsWheelSpinning(false);
            setSelectedPrize(
              prizes[
                Math.floor(
                  (numSegments - (randomDegree % 360)) / (360 / numSegments)
                )
              ]
            );
            setData(randomItem);
          }, 3000); // 2000ms is the time it takes to complete one full spin
        } else {
          setLoading(false);
          setError("No data received from the API.");
          setIsWheelSpinning(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setIsWheelSpinning(false);
      });
  };

  const handleSpinClick = () => {
    if (!isWheelSpinning) {
      fetchDataAndSpin();
    }
  };

  const handleShowWheelClick = () => {
    setSelectedPrize(null);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleShowPrizeClick = () => {
    if (data && data.name) {
      alert(`Congratulations! You won: ${data.name}`);
    } else if (!isWheelSpinning) {
      alert("Spin the wheel to get a prize!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded shadow-md">
        <div className="flex flex-col items-center">
          <div
            className={`relative w-64 h-64 border-8 border-indigo-500 rounded-full transition-transform ${
              isWheelSpinning ? "animate-spin" : ""
            }`}
          >
            <div className="absolute w-64 h-64 flex items-center justify-center">
              {isWheelSpinning ? "Spinning..." : "🎉"}
            </div>
            <div
              className={`absolute w-64 h-64 flex items-center justify-center ${
                isWheelSpinning ? "opacity-50" : ""
              }`}
            >
              <div className="w-60 h-60 bg-yellow-500 rounded-full">
                {/* Place your wheel image or design here */}
              </div>
            </div>
          </div>
          <button
            onClick={handleSpinClick}
            disabled={isWheelSpinning}
            className="mt-8 px-4 py-2 text-white bg-indigo-500 rounded shadow-md hover:bg-indigo-600"
          >
            Quay
          </button>
          <div className="mt-4">
            <button
              onClick={handleShowWheelClick}
              className="mr-2 px-4 py-2 text-white bg-green-500 rounded shadow-md hover:bg-green-600"
            >
              Quay
            </button>
            <button
              onClick={handleShowPrizeClick}
              className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-600"
            >
              Phần thưởng
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Prize Modal"
      >
        <h2>Congratulations!</h2>
        {/* <p>You won: {data.name}</p> */}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
