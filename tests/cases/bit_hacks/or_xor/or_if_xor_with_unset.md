# Preval test case

# or_if_xor_with_unset.md

> Bit hacks > Or xor > Or if xor with unset
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(3);
const y /*:number*/ = x | 32;
if (y) {
  const tmpClusterSSA_x /*:number*/ = x ^ 32;
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(3);
if (x | 32) {
  $(x ^ 32);
} else {
  $(x);
}
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

## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
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

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 35
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
