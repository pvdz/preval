# Preval test case

# single_bit_and_x_eq_y.md

> Bit hacks > And x if > And x if eq > Single bit and x eq y
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y === 32) {
  $('fail');
} else {
  $('pass');
}
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
x ** 0;
$(`pass`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(32768) ** 0;
$(`pass`);
`````

## Pre Normal


`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y === 32) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Normalized


`````js filename=intro
const x = $(32768);
const y = x & 32768;
const tmpIfTest = y === 32;
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
a ** 0;
$( "pass" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 32768
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
