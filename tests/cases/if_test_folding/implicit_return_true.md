# Preval test case

# implicit_return_true.md

> If test folding > Implicit return true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
}
f();
$(f());
`````

## Settled


`````js filename=intro
const tmpBool$1 /*:boolean*/ = !x;
$(tmpBool$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(!x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = !x;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
