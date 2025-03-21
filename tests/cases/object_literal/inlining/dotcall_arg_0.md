# Preval test case

# dotcall_arg_0.md

> Object literal > Inlining > Dotcall arg 0
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const obj = {f: g};
$dotCall(obj, window, undefined); // wot
`````


## Settled


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const obj /*:object*/ = { f: g };
$dotCall(obj, window, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $();
};
$dotCall({ f: g }, window, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = { f: a };
$dotCall( b, window, undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
