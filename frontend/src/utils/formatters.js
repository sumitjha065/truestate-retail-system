import { format, parseISO } from 'date-fns';

export const formatters = {
  // Format date: "2023-09-26"
  formatDate: (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
      return format(date, 'yyyy-MM-dd');
    } catch (error) {
      return 'Invalid Date';
    }
  },

  // Format currency: ₹99,000
  formatCurrency: (amount) => {
    if (amount === null || amount === undefined) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Format number with commas: 1,000,000
  formatNumber: (number) => {
    if (number === null || number === undefined) return '0';
    return new Intl.NumberFormat('en-IN').format(number);
  },

  // Format phone number: +91 9123456789
  formatPhoneNumber: (phone) => {
    if (!phone) return 'N/A';
    const phoneStr = phone.toString();
    if (phoneStr.length === 10) {
      return `+91 ${phoneStr.slice(0, 5)} ${phoneStr.slice(5)}`;
    }
    return phoneStr;
  },

  // Format tags: "casual,fashion" → ["casual", "fashion"]
  formatTags: (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return [];
  },

  // Truncate long text
  truncateText: (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  }
};