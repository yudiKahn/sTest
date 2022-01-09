import React from 'react'

function Gallery() {
    const imgsCount = 10;

    return(<div className="bg-white dark:bg-gray-800">
    <div className="mx-auto">            
      <section className="py-8 px-4 container mx-auto">
      <div className="flex flex-wrap -mx-4">
      {
        iterate(imgsCount, i=>
          <div key={i} className="md:w-1/2 px-4 mb-8 md:mb-0"><img className="rounded shadow-md my-1" src={`/imgs/gallery/i${i}.jpeg`} alt=""/></div>
        )
      }
      </div>
      </section>
    </div>
  </div>)
}

export default Gallery

function iterate(num, func){
  let res = [];
  for(let i=1;i<=num;i++){
    res.push(func(i));
  }
  return res;
}