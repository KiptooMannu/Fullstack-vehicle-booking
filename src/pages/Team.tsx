import { Footer, HeroPages, BookBanner, Navbar } from '../components';

import Person1 from '../images/team/1.webp';
import Person2 from '../images/team/2.webp';
import Person3 from '../images/team/3.webp';
import Person4 from '../images/team/4.webp';
import Person5 from '../images/team/5.webp';
import Person6 from '../images/team/6.webp';

const Team: React.FC = () => {
  interface TeamMember {
    img: string;
    name: string;
    job: string;
  }

  const teamMember: TeamMember[] = [
    { img: Person1, name: 'Mwende Karanja', job: 'General Manager' },
    { img: Person2, name: 'Wanyama Kiprop', job: 'Fleet Manager' },
    { img: Person3, name: 'Mutua Njoroge', job: 'Operations Manager' },
    { img: Person4, name: 'Koech Kirui', job: 'Customer Service Agent' },
    { img: Person5, name: 'Naliaka Wanjala', job: 'Financial Analyst' },
    { img: Person6, name: 'Achieng Omondi', job: 'Data Analyst' },
  ];

  return (
    <>
      <Navbar />
      <section className='team-page'>
        <HeroPages name='Our Team' />
        <div className='container'>
          <div className='team-container'>
            {teamMember.map((member, id) => (
              <div key={id} className='team-container__box'>
                <div className='team-container__box__img-div'>
                  <img src={member.img} alt={member.name} width='350' height='431' />
                </div>
                <div className='team-container__box__descr'>
                  <h3>{member.name}</h3>
                  <p>{member.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* book banner */}
        <BookBanner />
        {/* footer */}
        <Footer />
      </section>
    </>
  );
};

export default Team;
