# Preval test case

# array_in_array_ident_unsafe_hard.md

> Array > Spread > Array in array ident unsafe hard
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
let a = $(10);
const x = [1, a, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal

`````js filename=intro
let a = $(10);
const x = [1, a, 3];
if ($) a = $(20);
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized

`````js filename=intro
let a = $(10);
const x = [1, a, 3];
if ($) {
  a = $(20);
} else {
}
const y = [`a`, ...x, `b`];
$(y);
`````

## Output

`````js filename=intro
let a = $(10);
const arrEl = a;
if ($) {
  a = $(20);
} else {
}
const y = [`a`, 1, arrEl, 3, `b`];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 10 );
const b = a;
if ($) {
  a = $( 20 );
}
const c = [ "a", 1, b, 3, "b",, ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['a', 1, 10, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
