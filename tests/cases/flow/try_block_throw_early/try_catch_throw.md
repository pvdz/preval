# Preval test case

# try_catch_throw.md

> Flow > Try block throw early > Try catch throw
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


## Normalized
(This is what phase1 received the first time)

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
