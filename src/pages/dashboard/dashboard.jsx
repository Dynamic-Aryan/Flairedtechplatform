import React from 'react';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';
import { UserData } from '../../context/UserContext';

const Dashboard = () => {
  const { courses } = CourseData();
  const { user } = UserData(); // Assuming you have a user context that provides the user's data

  // Filter courses to include only those that the user has purchased
  const purchasedCourses = courses.filter(course =>
    user.subscription.includes(course._id)
  );

  return (
    <div className="py-20 text-center min-h-[55vh]">
      <h2 className="text-2xl font-semibold mb-10">All Enrolled Courses</h2>
      <div className="flex justify-around flex-wrap gap-5 mt-10">
        {purchasedCourses && purchasedCourses.length > 0 ? (
          purchasedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
