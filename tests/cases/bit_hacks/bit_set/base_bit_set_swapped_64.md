# Preval test case

# base_bit_set_swapped_64.md

> Bit hacks > Bit set > Base bit set swapped 64
>
> Specific pattern of checking if a bit is set

## Input

`````js filename=intro
const v = $(64);
const and = 64 & v;
const set = and === 64;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````

## Settled


`````js filename=intro
const v /*:unknown*/ = $(64);
const and /*:number*/ = 64 & v;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const v = $(64);
if (64 & v) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Pre Normal


`````js filename=intro
const v = $(64);
const and = 64 & v;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized


`````js filename=intro
const v = $(64);
const and = 64 & v;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 64 );
const b = 64 & a;
if (b) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 64
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
