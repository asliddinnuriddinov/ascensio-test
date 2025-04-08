'use client';

import styled from 'styled-components';
import { Product } from '@/shared/types/product';
import { theme } from '@/shared/styles/theme';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const Card = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
`;

const ProductImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${theme.spacing.md};
`;

const Name = styled.h3`
  font-size: 1.125rem;
  font-weight: ${theme.typography.heading.fontWeight};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

const Price = styled.p`
  font-size: 1rem;
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.heading.fontWeight};
`;

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <Card>
        <ImageContainer>
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            priority
          />
        </ImageContainer>
        <Content>
          <Name>{product.name}</Name>
          <Price>${product.price}</Price>
        </Content>
      </Card>
    </Link>
  );
};
