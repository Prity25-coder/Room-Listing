import { useEffect, useState } from "react";
import RoomItem from "./RoomItem";
import Loader from "./Loader";
import Error from "./Error";
import roomsData from "../data/sampleData.json"; // Import the local JSON data
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  // Custom hook for infinite scrolling
  const fetchRooms = () => {
    if (page * 10 < roomsData.length) {
      // Assume each page loads 10 rooms
      setRooms((prev) => [
        ...prev,
        ...roomsData.slice(page * 10, (page + 1) * 10),
      ]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useInfiniteScroll(fetchRooms, hasMore);

  return (
    <div className="room-list">
      {loading && <Loader />}
      {error && <Error message={error} />}
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
      {!hasMore && <div>No more rooms to load</div>}
    </div>
  );
};

export default RoomList;
