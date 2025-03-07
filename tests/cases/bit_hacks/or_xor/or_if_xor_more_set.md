# Preval test case

# or_if_xor_more_set.md

> Bit hacks > Or xor > Or if xor more set
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $('then');
} else {
  $('else');
}
$(x);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(35);
const y /*:number*/ = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(35);
if (x | 32) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(35);
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
let x = $(35);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
} else {
  $(`else`);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( 35 );
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

## Runtime Outcome

Should call `$` with:
 - 1: 35
 - 2: 'then'
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
