import "./featuredProperties.css";
import useFetch from "../../Hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/hotel?featured=false");
  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  if (!Array.isArray(data)) return <div>Invalid data format</div>;

  return (
    <div className="fp">
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.price}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
    </div>
  );
  
};

export default FeaturedProperties;
