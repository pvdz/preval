# Preval test case

# array_in_array_index_added.md

> Array > Spread > Array in array index added
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
x[4] = 5; // Changes array length
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
x[4] = 5;
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
x[4] = 5;
const y = [`a`, ...x, `b`];
$(y);
`````

## Output

`````js filename=intro
const x = [1, 2, 3];
x[4] = 5;
const y = [`a`, ...x, `b`];
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 1, 2, 3, undefined, 5, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
