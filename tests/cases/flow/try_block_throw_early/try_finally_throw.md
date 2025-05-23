# Preval test case

# try_finally_throw.md

> Flow > Try block throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

## Options

- globals: fail_early

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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = `pass`;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      fail_early;
      x = `fail`;
      $finalStep = true;
      $finalArg = `yes`;
      break $finally;
    } catch ($finalImplicit) {
      $(`still throws`);
      $(x);
      throw $finalImplicit;
    }
  }
  $(`still throws`);
  $(x);
  if ($implicitThrow) {
    throw $finalCatchArg;
  } else {
    throw $finalArg;
  }
};
f();
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'still throws'
 - 2: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
