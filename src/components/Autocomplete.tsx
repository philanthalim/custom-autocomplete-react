import React, { useState, useEffect, useRef } from "react";

interface Props {
  async: boolean;
  options: any;
  inputLabel: string;
  description: string;
  disabledInput: boolean;
  renderSearchList: any; //
  filterFunction: (item: any, query: any) => boolean;
}
function Autocomplete({
  async,
  options,
  inputLabel,
  description,
  disabledInput,
  renderSearchList,
  filterFunction,
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popperRef = useRef<HTMLInputElement>(null);
  // console.log(highlightedIndex);
  // console.log(selectedItems, "selectedItems");
  // console.log(searchResults,'ser')

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        if (highlightedIndex !== -1) {
          const objectToFind = searchResults[highlightedIndex];
          if (selectedItems.find((obj: any) => obj.id === objectToFind.id)) {
            setSelectedItems(
              selectedItems.filter(
                (selectedItem) => selectedItem.id !== objectToFind.id
              )
            );
          } else {
            setSelectedItems([...selectedItems, objectToFind]);
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchResults, highlightedIndex]);

  const handleOutsideClick = (event: any) => {
    if (popperRef.current && !popperRef.current.contains(event.target)) {
      setHighlightedIndex(-1);
      setIsOpen(false);
    }
  };

  // Attach click outside event listener, esc listener when the popper is open
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Debounce function
  const debounce = <T extends any[]>(
    func: (...args: T) => void,
    delay: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: T) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to fetch search results based on input value
  // On initial searching for async, 'no results found' shown as searchResults array is initially empty (shouldnt be the case)
  const fetchSearchResults = async (value: any) => {
    setIsOpen(true);
    setLoading(true);
    // setTimeout(() => {
    //   // Filter the data based on the search query
    //   const results = options.filter((item) => filterFunction(item, value));
    //   setSearchResults(results);
    //   setLoading(false);
    // }, 500);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const results = options.filter((item: any) => filterFunction(item, value));
    setLoading(false);
    setSearchResults(results);
  };

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

  //sync call
  useEffect(() => {
    if (!async) {
      setSearchResults(options);
    }
  }, []);

  const filterResults = (query: any) => {
    // Filter results synchronously based on the query
    const filteredResults = options.filter((result: any) =>
      filterFunction(result, query)
    );

    return filteredResults;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target!.value!;
    setInputValue(value);
    if (async) {
      debouncedFetchSearchResults(value);
    } else {
      setSearchResults(filterResults(value));
    }
  };

  const handleInputFocus = () => {
    if (!async) {
      setIsOpen(true);
    }
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleMouseOver = (index: number) => {
    setHighlightedIndex(index);
  };

  return (
    <div>
      <label className="text-gray-500">{inputLabel}</label>
      <div className="relative w-[310px]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-10"
          disabled={disabledInput}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.418 0-4.418-1.102-5.656-2.709l1.414-1.414zM20 12c0-4.418-3.582-8-8-8v4c2.418 0 4.418 1.102 5.656 2.709l-1.414 1.414A7.962 7.962 0 0120 12h4zm-4 5.291c1.238-1.607 3.238-2.709 5.656-2.709v4c-4.418 0-8-3.582-8-8h4c0 1.607.582 3.075 1.536 4.291l-1.536 1.418z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="h-full absolute bg-white bg-slate-50 h-[140px] w-[310px] z-50 overflow-y-auto rounded shadow"
          ref={popperRef}
        >
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((item, index) =>
                renderSearchList({
                  item,
                  index,
                  handleCheckboxChange,
                  selectedItems,
                  highlightedIndex,
                  handleMouseOver,
                })
              )}
            </ul>
          ) : (
            <p>No results were found</p>
          )}
        </div>
      )}
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default Autocomplete;
