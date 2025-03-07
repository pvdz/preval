# Preval test case

# base_multi_bits_64.md

> Bit hacks > Bit set > Base multi bits 64
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(64);
const and = v & 64;
const set = and === 64;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````

## Settled


`````js filename=intro
const v /*:unknown*/ = $(64);
const and /*:number*/ = v & 64;
if (and) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(64) & 64) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Pre Normal


`````js filename=intro
const v = $(64);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const v = $(64);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 64 );
const b = a & 64;
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 64
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
