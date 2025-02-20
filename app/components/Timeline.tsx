import React from "react";


export const Timeline = () => {
  return (
    <div className="relative w-full flex flex-col items-center p-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gray-800 h-full"> 
          <div className=" h-full w-1 rounded-full"></div> 
        </div>
        <div className="flex flex-col items-center gap-12 mt-8 w-full">
          {content.map((item, index) => (
            <div key={item.id} className={`relative flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center w-full max-w-4xl`}>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
              <div className={`absolute ${index % 2 === 0 ? 'left-[50%]' : 'right-[50%]'}  w-28 h-1 bg-gray-800`}></div>
              <div className="bg-white shadow-lg p-4 rounded-lg w-80 border border-gray-300">
                <p className="text-gray-700 text-center">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
  
  
const content = [
    {
      id: 1,
      text: "lorem ipsum dolem sajfn dajna fweofew ewoifdknsmnv dlvnsln dxscklnefewf dcxkk cksks sksmskmd "
    },
    {
      id: 2,
      text: "lorem ipsum dolem sajfn dajna fweofew ewoifdknsmnv dlvnsln dxscklnefewf dcxkk cksks sksmskmd "
    },
    {
      id: 3,
      text: "lorem ipsum dolem sajfn dajna fweofew ewoifdknsmnv dlvnsln dxscklnefewf dcxkk cksks sksmskmd "
    },
    {
      id: 4,
      text: "lorem ipsum dolem sajfn dajna fweofew ewoifdknsmnv dlvnsln dxscklnefewf dcxkk cksks sksmskmd "
    },
    {
      id: 5,
      text: "lorem ipsum dolem sajfn dajna fweofew ewoifdknsmnv dlvnsln dxscklnefewf dcxkk cksks sksmskmd "
    }
  
];
  

