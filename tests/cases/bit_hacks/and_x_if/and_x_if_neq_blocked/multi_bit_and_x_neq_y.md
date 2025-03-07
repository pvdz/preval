# Preval test case

# multi_bit_and_x_neq_y.md

> Bit hacks > And x if > And x if neq blocked > Multi bit and x neq y
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
if (y !== 64) {
  $('pass');
} else {
  $('fail');
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(200);
const y /*:number*/ = x & 200;
$(y);
const tmpIfTest /*:boolean*/ = y === 64;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(200) & 200;
$(y);
if (y === 64) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Pre Normal


`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
if (y !== 64) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Normalized


`````js filename=intro
const x = $(200);
const y = x & 200;
$(y);
const tmpIfTest = y !== 64;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 200 );
const b = a & 200;
$( b );
const c = b === 64;
if (c) {
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
 - 1: 200
 - 2: 200
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
