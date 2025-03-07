# Preval test case

# counter_nan.md

> Unwind loops > Separate test > Counter nan
>
> Unrolling loops

## Input

`````js filename=intro
let counter = NaN;
let test = counter >= 0;
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
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
let counter = NaN;
let test = counter >= 0;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  test = counter < 10;
}
`````

## Normalized


`````js filename=intro
let counter = NaN;
let test = counter >= 0;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
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
