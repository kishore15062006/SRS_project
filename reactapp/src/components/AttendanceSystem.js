import React,{useState} from 'react'

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
    <div>
      <h1>Attendance System</h1>
      <p>Welcome to Attendance System</p>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={addPerson}>Add Person</button>

      {people.length === 0 && <p>No people added yet</p>}

      <ul>
        {people.map(person => (
          <li key={person.id}>
            {person.name}
            <button onClick={() => markStatus(person.id, "Present")}>
              Present
            </button>
            <button onClick={() => markStatus(person.id, "Absent")}>
              Absent
            </button>
          </li>
        ))}
      </ul>

      <div>
        <p>Total: {total}</p>
        <p>Present: {present}</p>
        <p>Absent: {absent}</p>
      </div>
    </div>
  );
}

export default AttendanceSystem