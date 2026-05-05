import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListingItem from "../../components/ListingItem";
import Loader from '../../components/Loader'

const Search = () => {
  const LISTINGS_PER_PAGE = 9;
  const navigate = useNavigate();
  const location = useLocation();
  const defaultSidebarData = {
    searchTerm: "",
    type: "",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  };
  const parseSearchToFilters = (search) => {
    const urlParams = new URLSearchParams(search);
    return {
      searchTerm: urlParams.get("searchTerm") || "",
      type: urlParams.get("type") || "",
      parking: urlParams.get("parking") === "true",
      furnished: urlParams.get("furnished") === "true",
      offer: urlParams.get("offer") === "true",
      sort: urlParams.get("sort") || "createdAt",
      order: urlParams.get("order") || "desc",
    };
  };
  const [sidebarData, setSidebarData] = useState(() => ({
    ...defaultSidebarData,
    ...parseSearchToFilters(location.search),
  }));
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const buildSearchQuery = (filters) => {
    const urlParams = new URLSearchParams();
    if (filters.searchTerm) urlParams.set("searchTerm", filters.searchTerm);
    if (filters.type) urlParams.set("type", filters.type);
    if (filters.parking) urlParams.set("parking", "true");
    if (filters.furnished) urlParams.set("furnished", "true");
    if (filters.offer) urlParams.set("offer", "true");
    urlParams.set("sort", filters.sort);
    urlParams.set("order", filters.order);
    return urlParams.toString();
  };
  const buildPaginatedQuery = (filters, startIndex = 0) => {
    const urlParams = new URLSearchParams(buildSearchQuery(filters));
    urlParams.set("startIndex", String(startIndex));
    // fetch one extra item to determine if there is another page
    urlParams.set("limit", String(LISTINGS_PER_PAGE + 1));
    return urlParams.toString();
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const nextQuery = buildSearchQuery(sidebarData);
      const currentQuery = location.search.startsWith("?")
        ? location.search.slice(1)
        : location.search;
      if (nextQuery !== currentQuery) {
        navigate(`/search?${nextQuery}`, { replace: true });
      }
    }, 250);

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = buildPaginatedQuery(sidebarData, 0);
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setShowMore(data.length > LISTINGS_PER_PAGE);
      setListings(data.slice(0, LISTINGS_PER_PAGE));
      setLoading(false);
    };

    fetchListings();

    return () => clearTimeout(debounceTimer);
  }, [sidebarData]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData((prev) => ({
        ...prev,
        type: prev.type === e.target.id ? "" : e.target.id,
      }));
    }

    if (e.target.id === "searchTerm") {
      setSidebarData((prev) => ({ ...prev, searchTerm: e.target.value }));
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData((prev) => ({
        ...prev,
        [e.target.id]: !prev[e.target.id],
      }));
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData((prev) => ({ ...prev, sort, order }));
    }
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const searchQuery = buildPaginatedQuery(sidebarData, numberOfListings);
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    setShowMore(data.length > LISTINGS_PER_PAGE);
    setListings((prev) => [...prev, ...data.slice(0, LISTINGS_PER_PAGE)]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search...."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />

              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              value={`${sidebarData.sort}_${sidebarData.order}`}
              id="sort_order"
              className="border rounded-lg p-3 w-full"
            >
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 font-semibold">No listing found!</p>
          )}
          {loading && (
            <div className="text-xl text-slate-700 text-center w-full">
              <Loader containerHeight={'200px'} width={'35'} height={'35'} />
            </div>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore ? (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;