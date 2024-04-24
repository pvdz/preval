# Preval test case

# or_if_xor_with_unset.md

> Bit hacks > Or xor > Or if xor with unset
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

#TODO

## Input

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
} else {
}
$(x);
`````

## Output

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(x);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 3 );
const b = a | 32;
if (b) {
  a = a ^ 32;
  $( a );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 35
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
