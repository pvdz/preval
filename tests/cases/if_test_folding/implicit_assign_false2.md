# Preval test case

# implicit_assign_false2.md

> If test folding > Implicit assign false2
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  return y;
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
    y = false;
  } else {
    y = true;
  }
  return y;
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
    y = false;
    return y;
  } else {
    y = true;
    return y;
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
