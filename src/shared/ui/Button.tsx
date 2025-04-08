'use client';

import styled, { css } from 'styled-components';
import { theme } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.heading.fontWeight};
  transition: all 0.2s ease-in-out;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.background};
          &:hover {
            background-color: ${theme.colors.text};
          }
        `;
      case 'outline':
        return css`
          border: 2px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background};
          &:hover {
            background-color: ${theme.colors.accent};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
