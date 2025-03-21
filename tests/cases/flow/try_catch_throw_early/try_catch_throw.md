# Preval test case

# try_catch_throw.md

> Flow > Try catch throw early > Try catch throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } catch {
    throw_early
    $('caught');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
try {
  throw `yes`;
} catch (e) {
  throw_early;
  $(`caught`);
}
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `yes`;
} catch (e) {
  throw_early;
  $(`caught`);
}
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "yes";
}
catch (a) {
  throw_early;
  $( "caught" );
}
$( "pass" );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

throw_early


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
