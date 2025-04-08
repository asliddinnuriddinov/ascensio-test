'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  background-color: ${theme.colors.background};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${theme.typography.heading.fontWeight};
  color: ${theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text};
  font-weight: 500;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const CartCount = styled.span`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
`;

export const Navbar = () => {
  const { state } = useCart();
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Nav>
      <Container>
        <Logo href="/">Product Catalog</Logo>
        <NavLinks>
          <Link href="/products">Products</Link>
          <CartLink href="/cart">
            Cart {cartItemsCount > 0 && <CartCount>{cartItemsCount}</CartCount>}
          </CartLink>
        </NavLinks>
      </Container>
    </Nav>
  );
};
