# Preval test case

# dotcall_arg0_no_funcs.md

> Object literal > Inlining > Dotcall arg0 no funcs
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const h = function(){ $(); };
const obj = {f: 123};
$dotCall(h, obj, undefined); // obj has no funcs heh
`````


## Settled


`````js filename=intro
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function () {
  debugger;
  $();
  return undefined;
};
const h = function () {
  debugger;
  $();
  return undefined;
};
const obj = { f: 123 };
$dotCall(h, obj, undefined);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
