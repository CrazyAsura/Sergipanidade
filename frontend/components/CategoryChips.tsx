'use client';

import { Box, Chip, Stack } from '@mui/material';

const categories = [
  'Tudo',
  'Praias',
  'Museus',
  'Gastronomia',
  'Histórico',
  'Natureza',
  'Cultura'
];

interface CategoryChipsProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <Box sx={{ overflowX: 'auto', py: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
      <Stack direction="row" spacing={1}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => onSelect(cat)}
            color={selected === cat ? 'primary' : 'default'}
            variant={selected === cat ? 'filled' : 'outlined'}
            sx={{
              fontWeight: 600,
              px: 1,
              bgcolor: selected === cat ? 'primary.main' : 'white',
              borderColor: selected === cat ? 'primary.main' : '#eee',
              '&:hover': {
                bgcolor: selected === cat ? 'primary.dark' : '#f5f5f5',
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
