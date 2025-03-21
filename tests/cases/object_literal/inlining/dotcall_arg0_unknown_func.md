# Preval test case

# dotcall_arg0_unknown_func.md

> Object literal > Inlining > Dotcall arg0 unknown func
>
>

## Input

`````js filename=intro
const g = function(){ $(); };
const h = function(){ $(); };
const obj = {f: g};
$dotCall(h, obj, undefined); // not calling an obj prop value
`````


## Settled


`````js filename=intro
const g /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const h /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const obj /*:object*/ = { f: g };
$dotCall(h, obj, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $();
};
$dotCall(
  function () {
    $();
  },
  { f: g },
  undefined,
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $();
  return undefined;
};
const b = function() {
  debugger;
  $();
  return undefined;
};
const c = { f: a };
$dotCall( b, c, undefined );
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
