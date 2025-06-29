# Preval test case

# tdz_hoist.md

> Tofix > tdz hoist
>
> The call to $() should not be hoisted above the ref error.
> Seems this does happen for objects with unsafe prop values.

## Input

`````js filename=intro
const obj /*:object*/ /*truthy*/ = { b: true, prop: ref_error_here };
$();    // observable side effect that should not be executed due to a reference error
$(obj);
`````


## Settled


`````js filename=intro
$();
const obj /*:object*/ /*truthy*/ = { b: true, prop: ref_error_here };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$({ b: true, prop: ref_error_here });
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = {
  b: true,
  prop: ref_error_here,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { b: true, prop: ref_error_here };
$();
$(obj);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

ref_error_here


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: 
 - !eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - !1: 
 - !eval returned: ('<crash[ <ref> is not defined ]>')
