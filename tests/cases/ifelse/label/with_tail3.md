# Preval test case

# with_tail3.md

> Ifelse > Label > With tail3
>
> Regression

Something was allowing the collapse of a function to global space causing a return statement to appear outside of a function.

## Input

`````js filename=intro
const B = function () {
  const C = function () {
    const x = $(true);
    if (x) {
      $('inner');
    }
  };
  const r = C();
  return r;
};
B();

`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`inner`);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`inner`);
}
`````

## Pre Normal


`````js filename=intro
const B = function () {
  debugger;
  const C = function () {
    debugger;
    const x = $(true);
    if (x) {
      $(`inner`);
    }
  };
  const r = C();
  return r;
};
B();
`````

## Normalized


`````js filename=intro
const B = function () {
  debugger;
  const C = function () {
    debugger;
    const x = $(true);
    if (x) {
      $(`inner`);
      return undefined;
    } else {
      return undefined;
    }
  };
  const r = C();
  return r;
};
B();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "inner" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
