# Preval test case

# try_catch_throw.md

> Flow > Try block throw early > Try catch throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    fail_early
    x = 'pass';
    throw 'yes';
  } catch {
    $('caught');
  }
  $(x);
}
f();
`````

## Settled


`````js filename=intro
let x /*:string*/ = `fail`;
try {
  fail_early;
  x = `pass`;
  throw `yes`;
} catch (e) {
  $(`caught`);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = `fail`;
try {
  fail_early;
  x = `pass`;
  throw `yes`;
} catch (e) {
  $(`caught`);
}
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    fail_early;
    x = `pass`;
    throw `yes`;
  } catch (e) {
    $(`caught`);
  }
  $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    fail_early;
    x = `pass`;
    throw `yes`;
  } catch (e) {
    $(`caught`);
  }
  $(x);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
let a = "fail";
try {
  fail_early;
  a = "pass";
  throw "yes";
}
catch (b) {
  $( "caught" );
}
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail_early

## Runtime Outcome

Should call `$` with:
 - 1: 'caught'
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
