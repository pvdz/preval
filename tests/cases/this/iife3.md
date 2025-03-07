# Preval test case

# iife3.md

> This > Iife3
>
> From the React header

## Input

`````js filename=intro
const f = function () {
  if ($(1) && $(2)) {
    this;
  }
}
f();
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
}
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  if ($(1) && $(2)) {
    undefined;
  }
};
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  let tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpIfTest = $(2);
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
