# Preval test case

# unknown_return_false.md

> If test folding > Unknown return false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(0);
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
$(0);
const tmpBoolTrampoline /*:unknown*/ = $(0);
const tmpBoolTrampolineB /*:boolean*/ = !tmpBoolTrampoline;
$(tmpBoolTrampolineB);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
const tmpBoolTrampoline = $(0);
$(!tmpBoolTrampoline);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
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
  const x = $(0);
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
$( 0 );
const a = $( 0 );
const b = !a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
