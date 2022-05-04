const karachaevsk = new URL('../images/Karachaevsk.jpg', import.meta.url);
const elbrus = new URL('../images/Elbrus.png', import.meta.url);
const dombay = new URL('../images/Dombay.jpg', import.meta.url)

const initialCards = [
    {
      name: 'Карачаевск',
      link: karachaevsk,
    },
    {
      name: 'Гора Эльбрус',
      link: elbrus,
    },
    {
      name: 'Домбай',
      link: dombay,
    },
    {
      name: 'Гора Эльбрус',
      link: elbrus,
    },
    {
      name: 'Домбай',
      link: dombay,
    },
    {
      name: 'Карачаево-Черкесия',
      link: karachaevsk,
    }
  ];

  export default initialCards;