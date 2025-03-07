# Preval test case

# implicit_assign_inv_false.md

> If test folding > Implicit assign inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````

## Settled


`````js filename=intro
const f /*:()=>boolean*/ = function () {
  debugger;
  let y /*:boolean*/ = true;
  if (x) {
  } else {
    y = false;
  }
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  let y = true;
  if (!x) {
    y = false;
  }
  $(`block`);
  $(`block`);
  return y;
};
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $(`block`);
  $(`block`);
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
    y = true;
  } else {
    y = false;
  }
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = true;
  if (x) {

  }
  else {
    b = false;
  }
  $( "block" );
  $( "block" );
  return b;
};
a();
const c = a();
$( c );
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
