import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/utils.js
// Utility functions for the application

/**
 * Extract numeric value from price string
 * @param {string} priceStr - Price string (e.g., "R400", "From R300")
 * @returns {number} - Numeric price value
 */
export function extractPriceValue(priceStr) {
  if (!priceStr) return 0;
  const priceNum = parseFloat(priceStr.replace(/[^0-9.-]/g, ''));
  return isNaN(priceNum) ? 0 : priceNum;
}

/**
 * Calculate VAT amount (15%)
 * @param {number|string} price - Price value or string
 * @returns {number} - VAT amount
 */
export function calculateVAT(price) {
  const priceNum = typeof price === 'number' ? price : extractPriceValue(price);
  return priceNum * 0.15;
}

/**
 * Calculate total with VAT
 * @param {number|string} price - Price value or string
 * @returns {number} - Total amount including VAT
 */
export function calculateTotalWithVAT(price) {
  const priceNum = typeof price === 'number' ? price : extractPriceValue(price);
  const vat = calculateVAT(priceNum);
  return priceNum + vat;
}

/**
 * Format price as currency
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount) {
  return `R${amount.toFixed(2)}`;
}

/**
 * Format price without "From" prefix
 * @param {string} priceStr - Original price string
 * @returns {string} - Cleaned price string
 */
export function cleanPriceString(priceStr) {
  if (!priceStr) return 'R0.00';
  // Remove "From" prefix if it exists
  return priceStr.replace(/^From\s+/, '');
}
