import React, { useEffect, useRef, useState } from "react";
import {
  BoldText,
  DropDown,
  DropDownItem,
  Input,
  LightText,
  Search,
} from "./styles";
import { MdOutlineSearch } from "react-icons/md";
import { apiCall } from "../../utils/apiCall";
import { useNavigate } from "react-router-dom";

function AutoCompleteSearch() {
  const [inFocus, setInFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (
      e.key === "ArrowDown" &&
      activeIndex + 1 < filteredSuggestions?.length
    ) {
      setActiveIndex(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeIndex - 1 >= 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (e.key === "Escape") {
      setActiveIndex(-1);
      setInFocus(false);
      inputRef.current.blur();
    }
  };

  const searchForQuery = async (query) => {
    const res = await apiCall("GET", `search?query=${query}`);
    return res?.data?.Data;
  };

  const formatSuggestion = (suggestion) => {
    if (
      suggestion?.title
        ?.toLowerCase()
        ?.startsWith(searchQuery?.toLowerCase()) &&
      searchQuery?.length > 0
    ) {
      return (
        <>
          <LightText>
            {suggestion?.title?.substring(0, searchQuery?.length)}
          </LightText>
          <BoldText>
            {suggestion?.title?.substring(searchQuery?.length)}
          </BoldText>
        </>
      );
    } else {
      return suggestion?.title;
    }
  };

  useEffect(() => {
    // Fetch data from the API when searchQuery changes
    const fetchData = async () => {
      if (searchQuery?.length > 0) {
        const searchResults = await searchForQuery(searchQuery);
        setFilteredSuggestions(searchResults);
      } else {
        setFilteredSuggestions([]); // Clear suggestions when searchQuery is empty
      }
    };

    // Clear the previous timeout if it exists
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set a new timeout to call fetchData after a delay
    searchTimeout.current = setTimeout(fetchData, 300); // Adjust the debounce delay as needed

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(searchTimeout.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setInFocus(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Search>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setActiveIndex(-1);
            setInFocus(true);
          }}
          onBlur={() => {
            setActiveIndex(-1);
            // setInFocus(false);
          }}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <MdOutlineSearch fontSize={"25px"} color="#ccc" />
      </Search>
      {inFocus && searchQuery?.length > 0 && (
        <DropDown ref={dropdownRef}>
          {filteredSuggestions?.map((suggestion, index) => (
            <DropDownItem
              key={suggestion?._id}
              className={
                activeIndex === index
                  ? "dropdown__item active"
                  : "dropdown__item"
              }
              style={{
                background: activeIndex === index && "#2874f015",
              }}
              onMouseOver={() => setActiveIndex(index)}
              onMouseOut={() => setActiveIndex(-1)}
              onClick={() => {
                setInFocus(false);
                setSearchQuery("");
                navigate(`/video/${suggestion?._id}`);
              }}
            >
              {formatSuggestion(suggestion)}
            </DropDownItem>
          ))}
        </DropDown>
      )}
    </>
  );
}

export default AutoCompleteSearch;
