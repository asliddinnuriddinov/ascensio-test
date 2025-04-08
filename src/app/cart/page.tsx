'use client';

import styled from 'styled-components';
import { useCart } from '@/shared/context/CartContext';
import { theme } from '@/shared/styles/theme';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text};
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: ${theme.spacing.md};
  align-items: center;
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.secondary}20;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing.sm};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  color: ${theme.colors.text};
`;

const Price = styled.p`
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.heading.fontWeight};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 2;
  }
`;

const Quantity = styled.span`
  min-width: 40px;
  text-align: center;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.secondary};
`;

const Total = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.md};
  border-top: 2px solid ${theme.colors.secondary}20;
  font-size: 1.25rem;
  font-weight: ${theme.typography.heading.fontWeight};
`;

export default function CartPage() {
  const { state, updateQuantity, removeFromCart } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <Container>
        <Title>Shopping Cart</Title>
        <EmptyCart>
          <p style={{marginBottom:"20px"}}>Your cart is empty</p>
          <Button as="a" href="/products" style={{ marginTop: theme.spacing.md }}>
            Continue Shopping
          </Button>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Shopping Cart</Title>
      {state.items.map(item => (
        <CartItem key={item.id}>
          <ImageContainer>
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </ImageContainer>
          <ProductInfo>
            <ProductName>{item.name}</ProductName>
            <Price>${item.price}</Price>
          </ProductInfo>
          <QuantityControls>
            <Button
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              variant="outline"
            >
              -
            </Button>
            <Quantity>{item.quantity}</Quantity>
            <Button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              variant="outline"
            >
              +
            </Button>
          </QuantityControls>
          <Button
            onClick={() => removeFromCart(item.id)}
            variant="secondary"
          >
            Remove
          </Button>
        </CartItem>
      ))}
      <Total>
        <span>Total:</span>
        <Price>${total}</Price>
      </Total>
    </Container>
  );
}
