# Preval test case

# implicit_global_crash.md

> Tdz > Implicit global crash
>
> The call should be inlined but the implicit globals should still crash at runtime

## Input

`````js filename=intro
function f(w, x, y, z) {
  $('inline me');
}
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````


## Settled


`````js filename=intro
implicitGlobalShouldCrash;
$(`inline me`);
implicitGlobalShouldCrash;
$(`inline me`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobalShouldCrash;
$(`inline me`);
implicitGlobalShouldCrash;
$(`inline me`);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobalShouldCrash;
$( "inline me" );
implicitGlobalShouldCrash;
$( "inline me" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2, $$3) {
  let w = $$0;
  let x = $$1;
  let y = $$2;
  let z = $$3;
  debugger;
  $(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

implicitGlobalShouldCrash


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
