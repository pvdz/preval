# Preval test case

# regression.md

> If test sealer useless > Regression
>
> From a real world case. This part would lead to a crash in the transform. Ignore that it's crap.

## Input

`````js filename=intro
let target = bloop.bleep; // Related to this being a member expression
if (target) {
  unknown = target;
} else {
  target = $array_constructor;
unknown = target;
}
$('??'); // Referencing unknown or target here bypassed the error.
`````


## Settled


`````js filename=intro
unknown = $array_constructor;
$(`??`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown = $array_constructor;
$(`??`);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown = $array_constructor;
$( "??" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let target = bloop.bleep;
if (target) {
  unknown = target;
  $(`??`);
} else {
  target = $array_constructor;
  unknown = target;
  $(`??`);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
