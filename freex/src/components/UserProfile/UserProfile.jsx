const UserProfile = () => {
  const user = {
    name: "Ewa Kosicka",
    imgUrl: "",
    role: "Projektant UX",
    rating: 5.0,
    opinionsNumber: 33,
    hourlyRate: "100",
    joiningDate: "25.06.2023",
    description:
      "Cześć, jestem Ewa, projektant UX/UI, który tworzy projekty, które inspirują i pozostawiają trwały ślad. Dzięki ponad 6-letniemu doświadczeniu zawodowemu w projektowaniu UX/UI doskonaliłam swoje umiejetności tworzenia urzekających i znaczących projektów.",
    skills: ["Audyt UX", "Badania UX", "Badania UX"],
    opinions: [
      {
        title: "Audyt UX i przeprojektowanie strony",
        rating: 5.0,
        dexcription:
          "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
        skills: ["Audyt UX", "Badania UX", "Badania UX"],
        author: "Janusz Przedsiębiorczy",
        dateAdded: "10.10.2022",
      },
      {
        title: "Audyt UX i przeprojektowanie strony",
        rating: 5.0,
        dexcription:
          "Ewa zapewnia dobrą jakość pracy i bardzo dobry kontakt. Koszt jest trochę wyższy, ale Ewa rekompensuje to jakością. Dziękuję.",
        skills: ["Audyt UX", "Badania UX", "Badania UX"],
        author: "Janusz Przedsiębiorczy",
        dateAdded: "10.10.2022",
      },
    ],
    experience: [
      {
        role: "Senior UX/UI Specjalista",
        company: "Hrtec Sp. z o. o.",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
      {
        role: "Senior UX/UI Specjalista",
        company: "Hrtec Sp. z o. o.",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
    ],
    education: [
      {
        institution: "infoShare Academy",
        description: "Bootcamp UX Designer (240 h)",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
      {
        institution: "infoShare Academy",
        description: "Bootcamp UX Designer (240 h)",
        startingTime: "12.2022",
        endingTime: "07.2023",
      },
    ],
  };

  return (
    <div>
      <div className="container_left">
        <div className="general_info">
          <img src={user.imgUrl}></img>
          <span>{user.hourlyRate}</span>
          <div className="underline"></div>
          <span>{user.joiningDate}</span>
          <h4>{user.name}</h4>
          <h5>{user.role}</h5>
          <div>{user.rating}</div>
          <div>{user.opinionsNumber}</div>
          <p>{user.description}</p>
          <button type="button">Edit</button>
        </div>
        <div className="skills">
          <h4>Umiejętności</h4>
          <div className="underline"></div>
          <ul>
            {user.skills.map((item) => (
              <li key="toDoLater">{item}</li>
            ))}
          </ul>
        </div>
        {/* <div className="opinions">opinions</div> -tego na razie nie robię - zbyt skomplikowane */}
        <div className="experience">
          <h4>Doświadczenie</h4>
          <div className="underline"></div>
          <ul>
            {user.experience.map((item) => (
              <li key="todolater">
                <h5>{item.role}</h5>
                <span>{item.company}</span>
                <span>
                  {item.startingTime}-{item.endingTime}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="eductaion">
          <h4>Education</h4>
          <div className="underline"></div>
          <ul>
            {user.education.map((item) => (
              <li key="todolater">
                <h5>{item.institution}</h5>
                <span>{item.description}</span>
                <span>
                  {item.startingTime}-{item.endingTime}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container_right">
        <div className="contact">contact</div>
        <button>Przeglądaj innych freelancerów</button>
      </div>
    </div>
  );
};

export default UserProfile;
