import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  /* position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%) */
`;

const Img = styled.img`
  height: 8rem;
  width: auto;

  @media (max-width: 480px) {
    height: 6rem;
  }
`;


function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
