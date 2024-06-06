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
const a = $(10);
if ($) {
  $(20);
} else {
}
const y = [`a`, 1, a, 3, `b`];
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
if ($) {
  $( 20 );
}
const b = [ "a", 1, a, 3, "b" ];
$( b );
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
