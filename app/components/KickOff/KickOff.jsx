'use client'

import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { FaUpload, FaCalendarAlt } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './KickOff.css';
import Button from '../Button/Button';
import { db, collection, addDoc, storage } from "../../firebase/firebase"; // Assuming you have imported Firebase correctly
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

const PaymentModal = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [projectNameInput, setProjectNameInput] = useState("");
  const [goalValueInput, setGoalValueInput] = useState('')
  const [aboutProject, setAboutProject] = useState('')
  const [storageData, setStorageData] = useState(null)

  const handleCalendarIconClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSubmit = async () => {
    setShowCalendar(false);

    try {
      await addDoc(collection(db, "campaigns"), {
        ProjectName: projectNameInput,
        Goal: goalValueInput,
        About: aboutProject,
        StartDate: startDate,
        EndDate: endDate
      });
      if (storageData == null) return;
      const fileRef = ref(storage, `folder/${storageData.name + v4()}`)
      uploadBytes(fileRef, storageData).then(() => {
        alert('Img uploaded')
      })
      setProjectNameInput("");
      setGoalValueInput("")
      setAboutProject("")
      setStartDate("")
      setEndDate("")
      alert("Project name submitted successfully!");
    } catch (error) {
      console.error("Error submitting project name:", error);
      alert("An error occurred while submitting the project name.");
    }
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  return (
    <main>
      {modalOpen && (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background">
          <div className="bg-slate-50 lg:w-[50%] lg:h-[auto] rounded-xl p-4 flex flex-col justify-between sm:w-[75%] sm:h-[75%]">
            <div>
              <div>
                <Button type="button" clickAction={() => setModalOpen(false)}>
                  <IoIosArrowBack size={28} />
                </Button>
              </div>
              <div className="lg:m-2 md:m-0 lg:my-4 md:my-1 lg:text-[40px] md:text-[20px]">
                Kick-off <br /> your project
              </div>
              <div className="flex flex-col md:flex-row justify-between m-2">
                <div className="flex flex-col lg:mx-4">
                  <div className="flex flex-col">
                    <label className="font-mulish text-lg md:text-[18px]">Name of your project</label>
                    <input
                      type="text"
                      placeholder="Build a cat shelter with us!"
                      className="title-input bg-slate-50 p-2 input-field focus:outline-none focus:ring-0 project-name-input" // Add the unique class here
                      value={projectNameInput}
                      onChange={(e) => setProjectNameInput(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-mulish text-lg md:text-[18px]">Add your goal</label>
                    <input
                      placeholder="$0"
                      type="text"
                      value={goalValueInput}
                      onChange={(e) => setGoalValueInput(e.target.value)}
                      className="bg-slate-50 text-black text-[30px] w-full input-field focus:outline-none focus:ring-0 p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-mulish text-lg md:text-[18px]">Add your timeline</label>
                    <div className="flex flex-row justify-between relative">
                      <input
                        type="text"
                        name="input-field"
                        autoComplete="off"
                        placeholder="03/03/22 - 30/03/22"
                        className="title-input bg-slate-50 py-0 px-2 text-black font-medium text-base leading-normal text-left uppercase input-field focus:outline-none focus:ring-0"
                        onClick={handleCalendarIconClick}
                        defaultValue={startDate && endDate ? `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().slice(-2)} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear().toString().slice(-2)}` : ''}
                      />
                      <FaCalendarAlt
                        className="border-[1px] border-black rounded-lg p-3 absolute right-2 top-[-15px]"
                        size={40}
                        onClick={handleCalendarIconClick}
                      />
                      {showCalendar && (
                        <div className="calendar-modal absolute h-auto top-[40%] right-[5%] custom-calendar">
                          <div className='text-right mr-2'>
                            <Button type="button" clickAction={handleCancel}>
                              <CgClose className="mt-2 mr-1 font-bold" size={20} />
                            </Button>
                          </div>
                          <div className="calendar-container">
                            <DatePicker
                              selected={startDate}
                              startDate={startDate}
                              endDate={endDate}
                              onChange={handleDateChange}
                              selectsRange
                              inline
                              calendarClassName="custom-calendar"
                            />
                          </div>
                          <div className="confirm-button h-8 mb-2">
                            <Button type="button" clickAction={handleSubmit}>
                              Confirm
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-400 border rounded border-zinc-400 h-auto"></div>
                <div className="lg:mx-4 md:w-auto">
                  <div className="flex flex-col">
                    <label className="font-mulish text-lg md:text-[18px]">About your project</label>
                    <input
                      type="text"
                      placeholder="So many cats, so little homes. We want to provide home and care to them all. Help us build a dream shelter for all cats in our town."
                      value={aboutProject}
                      onChange={(e) => setAboutProject(e.target.value)}
                      className="title-input bg-slate-50 lg:py-7 md:py-1 input-field focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="flex flex-col items-center lg:my-10 md:my-1">
                    <span className="text-black p-4 text-[18px]">Add media</span>
                    <input
                      type="file"
                      className="hidden"
                      id="file-input"
                      onChange={(e) => { setStorageData(e.target.files[0]) }}
                    />
                    <label htmlFor="file-input" className="flex justify-center">
                      <FaUpload className="border-[1px] border-black rounded-lg p-3" size={40} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end lg:mt-5 md:mt-auto">
              <Button
                type="button"
                style="bg-zinc-950 rounded-md w-full p-2 text-white text-[15px]"
                clickAction={handleSubmit}
              >
                Upload project
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PaymentModal;
