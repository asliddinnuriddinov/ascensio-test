'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import { getProduct } from '@/shared/api/products';
import { Product } from '@/shared/types/product';
import { Button } from '@/shared/ui/Button';
import { theme } from '@/shared/styles/theme';
import { useCart } from '@/shared/context/CartContext';
import Link from 'next/link';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Name = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.heading.fontWeight};
`;

const Description = styled.p`
  color: ${theme.colors.secondary};
  line-height: ${theme.typography.body.lineHeight};
  margin: ${theme.spacing.md} 0;
`;

const BackButton = styled(Button)`
  margin-bottom: ${theme.spacing.lg};
`;

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        const productData = await getProduct(Number(params.id));
        setProduct(productData);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Link href="/products">
        <BackButton variant="outline">← Back to Products</BackButton>
      </Link>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </ImageContainer>
        <ProductDetails>
          <Name>{product.name}</Name>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          <Button onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </ProductDetails>
      </ProductContainer>
    </Container>
  );
}
