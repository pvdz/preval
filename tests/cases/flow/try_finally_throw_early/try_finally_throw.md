# Preval test case

# try_finally_throw.md

> Flow > Try finally throw early > Try finally throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    x = 'pass';
    throw 'yes';
  } finally {
    throw_early
    $('still throws');
    $(x); // but we can observe x here
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
throw_early;
$(`still throws`);
$(`pass`);
throw `yes`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw_early;
$(`still throws`);
$(`pass`);
throw `yes`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw_early;
$( "still throws" );
$( "pass" );
throw "yes";
`````


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
