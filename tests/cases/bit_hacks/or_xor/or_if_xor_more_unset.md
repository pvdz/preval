# Preval test case

# or_if_xor_more_unset.md

> Bit hacks > Or xor > Or if xor more unset
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $('then');
} else {
  $('else');
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(3);
const y /*:number*/ = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 3 );
const b = a | 32;
if (b) {
  a = a ^ 32;
  $( "then" );
}
else {
  $( "else" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 'then'
 - 3: 35
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
