import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Autocomplete from "./components/Autocomplete";
import "./App.css";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  const syncList = [
    {
      id: 1,
      name: "Persian",
      origin: "Iran",
      coat_length: "Long",
      temperament: ["Calm", "Gentle", "Quiet"],
      life_span: "10-15 years",
      weight: "7-12 pounds",
      colors: ["White", "Black", "Blue", "Cream"],
    },
    {
      id: 2,
      name: "Maine Coon",
      origin: "United States",
      coat_length: "Long",
      temperament: ["Gentle", "Intelligent", "Friendly"],
      life_span: "12-15 years",
      weight: "10-18 pounds",
      colors: ["Brown", "Black", "Tabby", "White"],
    },
    {
      id: 3,
      name: "Siamese",
      origin: "Thailand",
      coat_length: "Short",
      temperament: ["Affectionate", "Social", "Active"],
      life_span: "12-15 years",
      weight: "6-10 pounds",
      colors: ["Seal Point", "Chocolate Point", "Blue Point", "Lilac Point"],
    },
    {
      id: 4,
      name: "Scottish Fold",
      origin: "United Kingdom",
      coat_length: "Short",
      temperament: ["Sweet", "Loyal", "Playful"],
      life_span: "12-15 years",
      weight: "6-13 pounds",
      colors: ["White", "Blue", "Black", "Red"],
    },
    {
      id: 5,
      name: "Bengal",
      origin: "United States",
      coat_length: "Short",
      temperament: ["Active", "Alert", "Intelligent"],
      life_span: "12-15 years",
      weight: "8-15 pounds",
      colors: ["Brown", "Silver", "Snow", "Marble"],
    },
    {
      id: 6,
      name: "Ragdoll",
      origin: "United States",
      coat_length: "Long",
      temperament: ["Docile", "Gentle", "Affectionate"],
      life_span: "12-17 years",
      weight: "10-20 pounds",
      colors: ["Seal", "Blue", "Chocolate", "Lilac"],
    },
    {
      id: 7,
      name: "Sphynx",
      origin: "Canada",
      coat_length: "Hairless",
      temperament: ["Curious", "Affectionate", "Energetic"],
      life_span: "8-14 years",
      weight: "6-12 pounds",
      colors: ["White", "Black", "Blue", "Pink"],
    },
    {
      id: 8,
      name: "British Shorthair",
      origin: "United Kingdom",
      coat_length: "Short",
      temperament: ["Easygoing", "Affectionate", "Loyal"],
      life_span: "12-20 years",
      weight: "9-18 pounds",
      colors: ["Blue", "Cream", "Black", "Red"],
    },
    {
      id: 9,
      name: "Russian Blue",
      origin: "Russia",
      coat_length: "Short",
      temperament: ["Gentle", "Reserved", "Intelligent"],
      life_span: "15-20 years",
      weight: "7-12 pounds",
      colors: ["Blue", "Silver", "White", "Black"],
    },
    {
      id: 10,
      name: "Abyssinian",
      origin: "Ethiopia",
      coat_length: "Short",
      temperament: ["Curious", "Intelligent", "Active"],
      life_span: "12-15 years",
      weight: "6-10 pounds",
      colors: ["Ruddy", "Red", "Blue", "Fawn"],
    },
    {
      id: 11,
      name: "Exotic Shorthair",
      origin: "United States",
      coat_length: "Short",
      temperament: ["Affectionate", "Gentle", "Quiet"],
      life_span: "10-15 years",
      weight: "7-14 pounds",
      colors: ["White", "Black", "Blue", "Red"],
    },
    {
      id: 12,
      name: "Birman",
      origin: "Burma",
      coat_length: "Long",
      temperament: ["Gentle", "Affectionate", "Playful"],
      life_span: "12-16 years",
      weight: "6-12 pounds",
      colors: ["Seal", "Blue", "Chocolate", "Lilac"],
    },
  ];

  const asyncList = [
    {
      id: 1,
      country: "United States",
      currency: "US Dollar",
      capital: "Washington, D.C.",
    },
    {
      id: 2,
      country: "United Kingdom",
      currency: "British Pound",
      capital: "London",
    },
    { id: 3, country: "Germany", currency: "Euro", capital: "Berlin" },
    { id: 4, country: "Singapore", currency: "SGD", capital: "Singapore" },
    { id: 5, country: "Japan", currency: "Japanese Yen", capital: "Tokyo" },
    {
      id: 6,
      country: "Malaysia",
      currency: "Malaysia Ringgit",
      capital: "Kuala Lumpur",
    },
    { id: 7, country: "Korea", currency: "Korean Won", capital: "Seoul" },
  ];

  // Can be customised to handle filter logic
  const customFilterFunctionAsync = (item: any, query: any) => {
    return item.country.toLowerCase().includes(query.toLowerCase());
  };

  const customFilterFunctionSync = (item: any, query: any) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  };

  //can pass this as props to customise labelling (not implemented yet)
  const transformString = (originalString: string) => {
    return originalString.toUpperCase();
  };

  interface CustomOptionProps {
    index: number;
    item: any;
    handleCheckboxChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      item: any
    ) => void; 
    selectedItems: any;
    highlightedIndex: number;
    handleMouseOver: (idex: number) => void; 
  }

  const CustomOption = ({
    index,
    item,
    handleCheckboxChange,
    selectedItems,
    highlightedIndex,
    handleMouseOver,
  }: CustomOptionProps) => (
    <li
      key={item.id}
      onMouseMove={() => handleMouseOver(index)}
      className={` ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} ${
        highlightedIndex === index ? "bg-cyan-200" : ""
      }`}
    >
      <div className="flex flex-row p-4">
        <div className="flex flex-col w-full">
          <label className="w-full">{item.country}</label>{" "}
          <label className="w-full">{item.currency}</label>
        </div>
        <input
          type="checkbox"
          value={item}
          checked={selectedItems.includes(item)}
          onChange={(event) => handleCheckboxChange(event, item)}
        />
      </div>
    </li>
  );

  const CustomOptionSync = ({
    index,
    item,
    handleCheckboxChange,
    selectedItems,
    highlightedIndex,
    handleMouseOver,
  }: CustomOptionProps) => (
    <li
      onMouseMove={() => handleMouseOver(index)}
      key={item.id}
      className={` ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} ${
        highlightedIndex === index ? "bg-cyan-200" : ""
      }`}
    >
      <div className="flex flex-row p-4">
        <div className="flex w-full">
          <label>{item.name}</label>
        </div>
        <input
          type="checkbox"
          value={item}
          checked={selectedItems.includes(item)}
          onChange={(event) => handleCheckboxChange(event, item)}
        />
      </div>
    </li>
  );

  return (
    <div className="bg-gray-100 flex items-center justify-center p-7 h-screen">
      <div className="bg-white rounded-md p-7">
        <div className="flex flex-col items-center justify-center p-7 space-y-7">
          <Autocomplete
            async={true}
            inputLabel="Async search"
            description="With description and custom results display"
            filterFunction={customFilterFunctionAsync}
            options={asyncList}
            disabledInput={false}
            renderSearchList={({
              item,
              index,
              handleCheckboxChange,
              selectedItems,
              highlightedIndex,
              handleMouseOver,
            }: CustomOptionProps) => (
              <CustomOption
                index={index}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={selectedItems}
                highlightedIndex={highlightedIndex}
                handleMouseOver={handleMouseOver}
              />
            )}
          />
          <Autocomplete
            async={false}
            inputLabel="Sync search"
            description="With default display and search on focus"
            filterFunction={customFilterFunctionSync}
            options={syncList}
            disabledInput={false}
            renderSearchList={({
              item,
              index,
              handleCheckboxChange,
              selectedItems,
              highlightedIndex,
              handleMouseOver,
            }: CustomOptionProps) => (
              <CustomOptionSync
                index={index}
                item={item}
                handleCheckboxChange={handleCheckboxChange}
                selectedItems={selectedItems}
                highlightedIndex={highlightedIndex}
                handleMouseOver={handleMouseOver}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
