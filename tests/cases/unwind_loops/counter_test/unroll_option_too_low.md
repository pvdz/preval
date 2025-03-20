# Preval test case

# unroll_option_too_low.md

> Unwind loops > Counter test > Unroll option too low
>
> Should be able to raise the amount of loop unrolls

## Options

- unroll=15

## Input

`````js filename=intro
const arr = [`a`,`b`,`c`,];
let counter = 10;
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
$(arr[0]);
`````

## Settled


`````js filename=intro
$(`b`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````

## Pre Normal


`````js filename=intro
const arr = [`a`, `b`, `c`];
let counter = 10;
while (counter) {
  const e = arr.shift();
  arr.push(e);
  counter = counter - 1;
}
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`];
let counter = 10;
while (true) {
  if (counter) {
    const e = arr.shift();
    arr.push(e);
    counter = counter - 1;
  } else {
    break;
  }
}
const tmpCalleeParam = arr[0];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
