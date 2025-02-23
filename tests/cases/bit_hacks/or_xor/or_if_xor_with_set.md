# Preval test case

# or_if_xor_with_set.md

> Bit hacks > Or xor > Or if xor with set
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
} else {
}
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(35);
const y /*:number*/ = x | 32;
if (y) {
  const tmpClusterSSA_x /*:number*/ = x ^ 32;
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 35 );
const b = a | 32;
if (b) {
  const c = a ^ 32;
  $( c );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 35
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
