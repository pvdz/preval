# Preval test case

# implicit_assign_true.md

> If test folding > Implicit assign true
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
  $(`block`);
  $(`block`);
  const tmpBool /*:boolean*/ = !x;
  return tmpBool;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`block`);
  $(`block`);
  const tmpBool = !x;
  return tmpBool;
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
    y = false;
  } else {
    y = true;
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
    y = false;
    $(`block`);
    $(`block`);
    return y;
  } else {
    y = true;
    $(`block`);
    $(`block`);
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
const a = function() {
  debugger;
  $( "block" );
  $( "block" );
  const b = !x;
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

Post settled calls: BAD!!
 - 1: 'block'
 - 2: 'block'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - 1: 'block'
 - 2: 'block'
 - eval returned: ('<crash[ <ref> is not defined ]>')
