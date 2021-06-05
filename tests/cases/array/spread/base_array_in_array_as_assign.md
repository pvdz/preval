# Preval test case

# base_array_in_array_as_assign.md

> Array > Spread > Base array in array as assign
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
let y = [];
if ($) {
  y = ['a', ...x, 'b'];
} 
$(y);
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
let y = [];
if ($) {
  y = ['a', ...x, 'b'];
}
$(y);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
let y = [];
if ($) {
  y = ['a', ...x, 'b'];
} else {
}
$(y);
`````

## Output

`````js filename=intro
let y = [];
if ($) {
  y = ['a', 1, 2, 3, 'b'];
} else {
}
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
