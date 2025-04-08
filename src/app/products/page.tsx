'use client';

import { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { Button } from '@/shared/ui/Button';
import { getProducts, searchProducts } from '@/shared/api/products';
import { Product } from '@/shared/types/product';
import { theme } from '@/shared/styles/theme';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text};
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.secondary}20;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: ${theme.colors.secondary};
  padding: ${theme.spacing.xl};
`;

function SearchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize search query from URL
    const query = searchParams?.get('q') || '';
    setSearchQuery(query);
    if (query) {
      handleSearch(query);
    } else {
      loadProducts(1, true);
    }
  }, [searchParams]);

  const loadProducts = async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true);
      const response = await getProducts(pageNum);
      
      if (reset) {
        setProducts(response.items);
      } else {
        setProducts(prev => [...prev, ...response.items]);
      }
      
      setHasMore(response.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      setLoading(true);
      
      // Update URL with search query
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      router.replace(`${pathname}?${params.toString()}`);

      if (query.trim()) {
        const results = await searchProducts(query);
        setProducts(results);
        setHasMore(false); // No pagination for search results
      } else {
        loadProducts(1, true);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleLoadMore = () => {
    if (!isSearching) {
      loadProducts(page + 1);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </SearchContainer>
      
      {products.length > 0 ? (
        <>
          <Grid>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
          {hasMore && !isSearching && (
            <LoadMoreContainer>
              <Button
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </LoadMoreContainer>
          )}
        </>
      ) : (
        <NoResults>
          {loading ? 'Loading...' : 'No products found'}
        </NoResults>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <Container>
      <Title>Our Products</Title>
      <Suspense fallback={<NoResults>Loading products...</NoResults>}>
        <SearchProducts />
      </Suspense>
    </Container>
  );
}
