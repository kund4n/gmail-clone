import { useState } from "react";
type ResultsType = { uName: string; email: string; id: number }
type SearchInputTypes = {
    value?: string;
    results: ResultsType[];
    selectedItems:ResultsType[]
  };
type ListApiReturnType = (params: { search: string }) => Promise<SearchInputTypes["results"]>;

export const MultiInput = ({ 
    listApi,
    label="To",
    onSelect
}: { 
    listApi: ListApiReturnType;
    label?:string;
    onSelect:Function
 }) => {
  const [inputStates, setInputStates] = useState<SearchInputTypes>({
    results: [],
    selectedItems: []
  });
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputStates((old: SearchInputTypes) => ({
      ...old,
      value: e.target.value,
    }));
    listApi({ search: e.target.value }).then((res) => {
      console.log(res);
      setInputStates((old: SearchInputTypes) => ({
        ...old,
        results: res,
      }));
    });
  };
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div>
        <div>
            {inputStates.selectedItems.map(item=>(<span>{item.uName}</span>))}
          <input
            type="text"
            value={inputStates?.value}
            onChange={onInputChange}
          />
        </div>
        <div style={{
            backgroundColor:"white"
        }}>
            <ul>
                {inputStates.results?.map(result=>(<li
                 onClick={e=>{
                    e.preventDefault();
                    const selectedItems = [...inputStates.selectedItems,result];
                    onSelect(selectedItems);
                    setInputStates(old=>({...old,selectedItems}));
                 }}
                >{result.uName}</li>))}
                
            </ul>
        </div>
      </div>
    </div>
  );
};
