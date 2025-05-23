# Preval test case

# implicit_global_crash_two_call.md

> Function trampoline > Call only > Implicit global crash two call
>
> The call should be inlined but the implicit globals should still crash at runtime

## Input

`````js filename=intro
const f = function () {
$(`inline me`);
  return undefined;
};
f(implicitGlobalShouldCrash, a, b, c);
f(implicitGlobalShouldCrash, a, b, c);
`````


## Settled


`````js filename=intro
implicitGlobalShouldCrash;
a;
b;
c;
$(`inline me`);
implicitGlobalShouldCrash;
a;
b;
c;
$(`inline me`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
implicitGlobalShouldCrash;
a;
b;
c;
$(`inline me`);
implicitGlobalShouldCrash;
a;
b;
c;
$(`inline me`);
`````


## PST Settled
With rename=true

`````js filename=intro
implicitGlobalShouldCrash;
a;
b;
c;
$( "inline me" );
implicitGlobalShouldCrash;
a;
b;
c;
$( "inline me" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
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


BAD@! Found 4 implicit global bindings:

implicitGlobalShouldCrash, a, b, c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
