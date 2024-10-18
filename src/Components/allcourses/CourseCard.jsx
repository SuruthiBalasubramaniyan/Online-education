// import React, { useEffect, useState } from 'react';
// import './courses.css';

// function CourseCard() {
//   const [coursesCard, setCoursesCard] = useState([]); // State to store the course card data
//   const [loading, setLoading] = useState(true); // Loading state for API call

//   useEffect(() => {
//     // Fetch course card data from the backend API
//     const fetchCoursesData = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/course-card"); // Update with your API URL
//         const data = await response.json();
//         setCoursesCard(data); // Set the fetched data to state
//         setLoading(false); // Disable loading once data is fetched
//       } catch (error) {
//         console.error("Error fetching courses data:", error);
//         setLoading(false);
//       }
//     };

//     fetchCoursesData();
//   }, []); // Empty dependency array ensures it runs once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading message while data is being fetched
//   }

//   return (
//     <>
//       <section className='coursesCard'>
//         <div className='container grid2'>
//           {coursesCard.map((val) => (
//             <div className='items' key={val._id}>
//               <div className='left'>
//                 <div className='img'>
//                   <img src={val.cover} alt='cover' />
//                 </div>
//                 <div className='text'>
//                   <h1 className='csname'>{val.coursesName}</h1>
//                   <div className='rate'>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <i className='fa fa-star'></i>
//                     <label htmlFor=''>(5.0)</label>
//                   </div>
//                   <div className='details'>
//                     {val.courTeacher.map((details, index) => (
//                       <div className='box' key={index}>
//                         <div className='dimg'>
//                           <img src={details.dcover} alt='dcover' />
//                         </div>
//                         <div className='para'>
//                           <h4>{details.name}</h4>
//                         </div>
//                         <span>{details.totalTime}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className='price'>
//                 <h3>
//                   {val.priceAll} / {val.pricePer}
//                 </h3>
//               </div>
//               <button className='btn online-btn'>ENROLL NOW!</button>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

// export default CourseCard;
import React, { useState, useEffect } from 'react';
import './courses.css';

function CourseCard() {
  const [coursesCard, setCoursesCard] = useState([]); // State for course card data
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const [selectedCourse, setSelectedCourse] = useState(null); // Track selected course
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    resume: null,
  });

  // Fetch course data when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/course-card');
        const data = await response.json();
        console.log('Fetched courses data:', data); // Debugging line
        if (Array.isArray(data)) {
          setCoursesCard(data); // Set coursesCard only if data is an array
        } else {
          console.warn('Expected array but received:', data);
          setCoursesCard([]); // Set to empty if not an array
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCoursesCard([]); // Reset to empty array on error
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);
  

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true); // Show modal when Enroll Now button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Check if the file is selected
    setFormData({
      ...formData,
      resume: file,  
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enrollmentData = new FormData();
    enrollmentData.append('name', formData.name);
    enrollmentData.append('email', formData.email);
    enrollmentData.append('mobile', formData.mobile);
    enrollmentData.append('resume', formData.resume);
    enrollmentData.append('courseName', selectedCourse.coursesName);
  
    try {
      const response = await fetch('http://localhost:4000/api/enroll', {
        method: 'POST',
        body: enrollmentData,
      });
      const result = await response.json();
  
      if (!response.ok) {  
        throw new Error(result.message || 'Something went wrong.');
      }
  
      alert('Enrollment Successful!');
    } catch (error) {
      console.error('Error in enrollment:', error);
      alert(`Failed to enroll: ${error.message}`); // Show the error message
    }
    handleCloseModal();  
  };
  ;

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <section className='coursesCard'>
        <div className='container grid2'>
          {coursesCard.map((val) => (
            <div className='items' key={val._id}>
              <div className='left'>
                <div className='img'>
                  <img src={val.cover} alt='cover' />
                </div>
                <div className='text'>
                  <h1 className='csname'>{val.coursesName}</h1>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <label htmlFor=''>(5.0)</label>
                  </div>
                  <div className='details'>
                    {val.courTeacher.map((details) => (
                      <div key={details.name} className='box'>
                        <div className='dimg'>
                          <img src={details.dcover} alt='dcover' />
                        </div>
                        <div className='para'>
                          <h4>{details.name}</h4>
                        </div>
                        <span>{details.totalTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='price'>
                <h3>{val.priceAll} / {val.pricePer}</h3>
              </div>
              <button className='btn online-btn' onClick={() => handleEnrollClick(val)}>
                ENROLL NOW!
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Enrollment */}
{showModal && (
  <div className='modal'>
    <div className='modal-content'>
      <span className='close' onClick={handleCloseModal}>&times;</span>
      <h2>Enroll in {selectedCourse?.coursesName}</h2> {/* Use optional chaining in case selectedCourse is null */}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type='tel'
          name='mobile'
          placeholder='Mobile Number'
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        <input
          type='file'
          name='resume'
          onChange={handleFileChange}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  </div>
)}

    </>
  );
}

export default CourseCard;

