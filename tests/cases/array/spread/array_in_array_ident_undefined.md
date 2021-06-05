# Preval test case

# array_in_array_ident_undefined.md

> Array > Spread > Array in array ident undefined
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
let a = $(10);
const x = [1, undefined, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal

`````js filename=intro
let a = $(10);
const x = [1, undefined, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````

## Normalized

`````js filename=intro
let a = $(10);
const x = [1, undefined, 3];
if ($) {
  a = $(20);
} else {
}
const y = ['a', ...x, 'b'];
$(y);
`````

## Output

`````js filename=intro
$(10);
if ($) {
  $(20);
} else {
}
const y = ['a', 1, undefined, 3, 'b'];
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['a', 1, undefined, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
