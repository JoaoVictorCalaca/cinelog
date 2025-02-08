export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export const handleProfit = (revenue: number, budget: number) => {
  const profit = revenue - budget

  return profit <= budget ? `Prejuízo de ${formatCurrency(profit*-1)}` : `Lucro de ${formatCurrency(profit)}`
}
