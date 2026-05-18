import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  const filteredTeachers = teachers.filter(t =>
    t.username.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.username.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-transparent">

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* TEACHERS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Teachers</h2>
            <button className="text-white px-4 py-2 rounded-lg font-bold transition" style={{ backgroundColor: '#03A07B' }}>
              + Add Teacher
            </button>
          </div>
          <input
            type="text"
            value={teacherSearch}
            onChange={(e) => setTeacherSearch(e.target.value)}
            placeholder="Search teachers..."
            className="w-full px-3 py-2 border rounded-xl mb-4"
          />
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {filteredTeachers.length === 0 ? (
              <p className="text-gray-500">No teachers yet.</p>
            ) : (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => { setSelectedStudent(null); setSelectedTeacher(teacher); }}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Avatar name={teacher.username} picture={teacher.picture} size="md" />
                    <div>
                      <p className="font-semibold">{teacher.username}</p>
                      <p className="text-sm text-gray-500">{teacher.email}</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#03A07B' }}>Manage →</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* STUDENTS SECTION */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Students</h2>
          </div>
          <input
            type="text"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full px-3 py-2 border rounded-xl mb-4"
          />
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {filteredStudents.length === 0 ? (
              <p className="text-gray-500">No students yet.</p>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => { setSelectedTeacher(null); setSelectedStudent(student); }}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <Avatar name={student.username} picture={student.picture} size="md" />
                    <div>
                      <p className="font-semibold">{student.username}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#03A07B' }}>Manage →</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* TEACHER SIDEBAR */}
      {selectedTeacher && (
        <aside className="w-80 sticky top-0 h-screen overflow-y-auto bg-white/90 backdrop-blur-md border-l p-6 flex flex-col items-center">
          <button onClick={() => setSelectedTeacher(null)} className="self-end text-gray-400 hover:text-gray-600 mb-4">
            <X size={24} />
          </button>
          <Avatar name={selectedTeacher.username} picture={selectedTeacher.picture} size="lg" />
          <h2 className="text-2xl font-bold mt-4">{selectedTeacher.username}</h2>
          <p className="text-gray-500">{selectedTeacher.email}</p>
          <div className="mt-6 w-full space-y-3">
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
              Delete Teacher
            </button>
          </div>
        </aside>
      )}

      {/* STUDENT SIDEBAR */}
      {selectedStudent && (
        <aside className="w-80 sticky top-0 h-screen overflow-y-auto bg-white/90 backdrop-blur-md border-l p-6 flex flex-col items-center">
          <button onClick={() => setSelectedStudent(null)} className="self-end text-gray-400 hover:text-gray-600 mb-4">
            <X size={24} />
          </button>
          <Avatar name={selectedStudent.username} picture={selectedStudent.picture} size="lg" />
          <h2 className="text-2xl font-bold mt-4">{selectedStudent.username}</h2>
          <p className="text-gray-500">{selectedStudent.email}</p>
          <div className="mt-6 w-full space-y-3">
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
              Delete Student
            </button>
          </div>
        </aside>
      )}

    </div>
  );
}