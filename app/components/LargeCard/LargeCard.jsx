import './LargeCard.css'

const LargeCard = () => {
  return (
    <main className='large-main'> 
      <div> 
        <p className="project-description lg:text-[55px] max-sm:text-[20px] lg:m-[1rem] lg:my-[2rem] m-[1.5rem] tracking-[0px] lg:tracking-tight"> 
          <span className="project-text">Project&nbsp;of&nbsp;the&nbsp;week</span> 
        </p> 
      </div> 
      <div className="grid lg:grid-cols-2 gap-4 lg:m-[1rem] lg:mb-[4rem]"> 
        <div className="column lg:py-3 sm:py-0 h-[25rem]"> 
          <div className="w-[100%] h-[100%] flex flex-col justify-between items-center opacity-100 bg-gray-200 rounded-xl border-0"> 
          </div> 
          <div className="image-container-style absolute top-[-20px] left-0 z-5 w-[95%] h-[100%] bg-center bg-cover bg-no-repeat border-0 rounded-[8px]"> 
          </div> 
        </div> 
        <div className='project-information'> 
          <div className='project-title'> 
            <h1>Help us release <br/>cookbook for parents <br /> and kids</h1> 
          </div> 
          <div className='project-descripe'> 
            <p>We want to create beautiful and helpful cooking book for parents and kids to have fun in kitchen.</p> 
          </div> 
          <div> 
            <div className="custom-container" data-dom-node="true" mode="PROTOTYPE/MODES/MODE_PLAY"> 
                <div className="custom-background"></div> 
            </div> 
          </div> 
          <div className='donation-info'> 
            <div className='donation-amount'> 
              <p className='donation-tag'>Raised:</p> 
              <p>$2.000</p> 
            </div> 
            <div className='donation-amount'> 
              <p className='donation-tag'> 
                Goal:</p> 
              <p>$3.000</p> 
            </div> 
          </div> 
        </div> 
      </div> 
      <div className="bg-zinc-400 border rounded border-zinc-400 w-auto lg:mt-[4rem] mt-[1rem]"></div>
    </main>


  );
}

export default LargeCard