# Preval test case

# unknown_return_inv_false.md

> If test folding > Unknown return inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(0);
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
  }
}
f();
$(f());
`````

## Settled


`````js filename=intro
$(0);
const tmpBoolTrampoline /*:unknown*/ = $(0);
const tmpBoolTrampolineB /*:boolean*/ = Boolean(tmpBoolTrampoline);
$(tmpBoolTrampolineB);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(Boolean($(0)));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
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
    return true;
  } else {
    return false;
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
const b = Boolean( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
