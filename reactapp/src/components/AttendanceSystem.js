import React,{useState} from 'react'
import "../components/AttendanceSystem.css"

const AttendanceSystem = () => {
    const [name, setName] = useState("");
  const [people, setPeople] = useState([]);

  const addPerson = () => {
    if (name.trim() === "") return;

    setPeople([
      ...people,
      { id: Date.now(), name: name, status: "Absent" }
    ]);
    setName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addPerson();
    }
  };

  const markStatus = (id, status) => {
    setPeople(
      people.map(person =>
        person.id === id ? { ...person, status } : person
      )
    );
  };

  const total = people.length;
  const present = people.filter(p => p.status === "Present").length;
  const absent = people.filter(p => p.status === "Absent").length;

  return (
    <div className='attendance-container'>
      <h1>Attendance System</h1>
      <p>Welcome to Attendance System</p>
      <div className='input-section'>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addPerson}>Add Person</button>
      </div>

      {people.length === 0 && <p className='no-data'>No people added yet</p>}

      <ul>
        {people.map(person => (
          <li key={person.id}>
          <span className='person-name'>{person.name}</span>
            <div className='status-buttons'>
            <button className="present-btn" onClick={() => markStatus(person.id, "Present")}>
              Present
            </button>
            <button className="absent-btn" onClick={() => markStatus(person.id, "Absent")}>
              Absent
            </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className='summary'>
        <p>Total: {total}</p>
        <p>Present: {present}</p>
        <p>Absent: {absent}</p>
      </div>
    </div>
  );
}

export default AttendanceSystem