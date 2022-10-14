import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

export const ageFilter = (value, onChangeHandle) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={onChangeHandle}
      >
        <MenuItem value={1}>Low to High Price</MenuItem>
        <MenuItem value={2}>High to Low Price</MenuItem>
        <MenuItem value={3}>By Distance</MenuItem>
        <MenuItem value={4}>By Popularity</MenuItem>
      </Select>
    </FormControl>
  );
};
