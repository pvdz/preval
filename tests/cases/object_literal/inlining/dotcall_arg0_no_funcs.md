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
const h /*:()=>unknown*/ = function () {
  debugger;
  $();
  return undefined;
};
const obj /*:object*/ = { f: 123 };
$dotCall(h, obj, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(
  function () {
    $();
  },
  { f: 123 },
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
const b = { f: 123 };
$dotCall( a, b, undefined );
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
