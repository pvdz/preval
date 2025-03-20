# Preval test case

# try_finally_throw.md

> Flow > Try block throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'pass';
  try {
    fail_early
    x = 'fail';
    throw 'yes';
  } finally {
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:string*/ = `pass`;
try {
  fail_early;
  x = `fail`;
} catch ($finalImplicit) {
  $(`still throws`);
  $(x);
  throw $finalImplicit;
}
$(`still throws`);
$(`fail`);
throw `yes`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = `pass`;
try {
  fail_early;
  x = `fail`;
} catch ($finalImplicit) {
  $(`still throws`);
  $(x);
  throw $finalImplicit;
}
$(`still throws`);
$(`fail`);
throw `yes`;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "pass";
try {
  fail_early;
  a = "fail";
}
catch (b) {
  $( "still throws" );
  $( a );
  throw b;
}
$( "still throws" );
$( "fail" );
throw "yes";
`````


## Globals


BAD@! Found 1 implicit global bindings:

fail_early


## Runtime Outcome


Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
