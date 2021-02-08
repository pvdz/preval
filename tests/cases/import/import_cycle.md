# Preval test case

# import_default.md

> import > import_default
>
> Import statements need special care in our system and our tests

A cycle while there is at least one root file (with no imports).

### THROWS cycle

## Input

`````js filename=intro
import x from 'x';
$(x);
`````

`````js filename=y
let y = 10;
import x from 'x';
export default y;
$(x, y);
`````

`````js filename=x
let x = 20;
import y from 'y';
export default x;
$(x, y);
`````

## Output

BAD~! Expected to throw an error but none was thrown ;(
