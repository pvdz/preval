# Preval test case

# unroll_option_too_low_10.md

> Unwind loops > Counter test > Unroll option too low 10
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
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

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
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_push