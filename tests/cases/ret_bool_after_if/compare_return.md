# Preval test case

# compare_return.md

> Ret bool after if > Compare return
>
> When the if-test must be a bool and the branches return true/false, the if can collapse.

## Input

`````js filename=intro
function f() {
  const x = $(100);
  if (x <= 100) {
    return true;
  } else {
    return false;
  }
}
$(f());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
const tmpIfTest /*:boolean*/ = x <= 100;
$(tmpIfTest);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) <= 100);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  if (x <= 100) {
    return true;
  } else {
    return false;
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  const tmpIfTest = x <= 100;
  if (tmpIfTest) {
    return true;
  } else {
    return false;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a <= 100;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
