import { API_END_POINT } from "../Constant.js";
export default function Places({
  isloading,
  message,
  title,
  places,
  fallbackText,
  onSelectPlace,
}) {
  console.log(places);
  return (
    <section className="places-category">
      {isloading && <p className="fallback-text">{message}</p>}
      <h2>{title}</h2>
      {!isloading && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!isloading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={API_END_POINT+`${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
