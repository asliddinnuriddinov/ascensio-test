'use client';

import styled from 'styled-components';
import { theme } from '@/shared/styles/theme';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

const Container = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.secondary};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
`;

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Product Catalog</Title>
      <Subtitle>
        Discover our amazing collection of products with modern design and great features
      </Subtitle>
      <Button as={Link} href="/products">
        Browse Products
      </Button>
    </Container>
  );
}
