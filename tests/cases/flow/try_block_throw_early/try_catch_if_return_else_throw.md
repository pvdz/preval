# Preval test case

# try_catch_if_return_else_throw.md

> Flow > Try block throw early > Try catch if return else throw
>
> The throw may leave the binding mutated anyways

## Options

- globals: fail_early

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    fail_early
    if ($) {
      return;
    } else {
      x = 'pass';
      throw 'too';
    }
    x = 'fail2'; // This is dead code either way
  } catch {
    $('caught');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
$inlinedFunction: {
  let x /*:string*/ = `fail`;
  try {
    fail_early;
    if ($) {
      break $inlinedFunction;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    $(`caught`);
  }
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$inlinedFunction: {
  let x = `fail`;
  try {
    fail_early;
    if ($) {
      break $inlinedFunction;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    $(`caught`);
  }
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$inlinedFunction: {
  let a = "fail";
  try {
    fail_early;
    if ($) {
      break $inlinedFunction;
    }
    else {
      a = "pass";
      throw "too";
    }
  }
  catch (b) {
    $( "caught" );
  }
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    fail_early;
    if ($) {
      return undefined;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    $(`caught`);
  }
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'caught'
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
