// import styled from 'styled-components';
// import Logo from './Logo';
// import MainNav from './MainNav';
// import { Uploader } from '../data/Uploader';
// const StyledSidebar = styled.aside`
//   background-color: var(--color-grey-0);
//   padding: 3.2rem 2.4rem;
//   border-right: 1px solid var(--color-grey-100);

//   grid-row: 1 / -1;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;

// function Sidebar() {
//   return (
//     <StyledSidebar>
//       <Logo />
//       <MainNav />
//       {/* <Uploader /> */}
//     </StyledSidebar>
//   );
// }

// export default Sidebar;

import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
// import { Uploader } from '../data/Uploader';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 👈 Pushes badge to bottom */
  gap: 3.2rem;
`;

const Badge = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: var(--color-grey-500);
  background-color: var(--color-grey-100);
  padding: 0.8rem 1.2rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: 500;
`;

const Icon = styled.span`
  font-size: 1.4rem;
`;
// Only logs once when app loads
console.log(
  `%c
██████╗ ███████╗██╗   ██╗     Dev: Ahmed Elshahat
██╔══██╗██╔════╝╚██╗ ██╔╝     📧 a7med.elshahhat@gmail.com
██████╔╝█████╗   ╚████╔╝      fullstack Developer | Open for business
`,
  'color: #00ff9f; font-size: 16px; font-family: monospace; background: #111; padding: 16px; border-radius: 6px;',
);

function Sidebar() {
  return (
    <StyledSidebar>
      <div>
        <Logo />
        <MainNav />
        {/* <Uploader /> */}
      </div>

      <Badge>
        <Icon>💻</Icon> Developed by Ahmed Elshahat
      </Badge>
    </StyledSidebar>
  );
}

export default Sidebar;
