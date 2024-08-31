import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../../components/ListingItem";
import Loader from "../../components/Loader";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        // offer listings
        const offer_res = await fetch("/api/listing/get?offer=true&limit=4");
        const offer_listings = await offer_res.json();
        setOfferListings(offer_listings);

        // rent listings
        const rent_res = await fetch("/api/listing/get?type=rent&limit=4");
        const rent_listings = await rent_res.json();
        setRentListings(rent_listings);

        // sale listings
        const sale_res = await fetch("/api/listing/get?type=sale&limit=4");
        const sale_listings = await sale_res.json();
        setSaleListings(sale_listings);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    }

    fetchAllListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto home-page-container">
        <h1 className="text-blue-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-blue-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          PropertyPulse is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of property to choose from.
        </div>

        <Link
          to={"/search"}
          className="bg-blue-700 text-white p-3 text-center rounded-lg mt-3 hover:opacity-90 w-[160px]"
        >
          Let's get started..
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing  results for offer, sale and rent*/}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-3 md:mt-5 md:mb-28">
        {loading ? <Loader containerHeight={'120px'} width={'35'} height={'35'} />
          :
          <>
            {offerListings && offerListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-blue-700">
                    Recent Offers
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/search?offer=true"}
                  >
                    Show more offers
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {rentListings && rentListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-blue-700">
                    Recent Places For Rent
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/search?type=rent"}
                  >
                    Show more places for rent
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {saleListings && saleListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-blue-700">
                    Recent Places For Sale
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/search?type=sale"}
                  >
                    Show more places for sale
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default Home;