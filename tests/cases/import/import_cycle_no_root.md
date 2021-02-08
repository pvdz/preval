# Preval test case

# import_default.md

> import > import_default
>
> Import statements need special care in our system and our tests

No files that have no imports must lead to a cycle.

### THROWS cycle

## Input

`````js filename=intro
let y = 10;
import x from 'x';
export default y;
$(x, y);
`````

`````js filename=x
let x = 10;
import y from 'intro';
export default x;
$(x, y);
`````

## Output

BAD~! Expected to throw an error but none was thrown ;(
