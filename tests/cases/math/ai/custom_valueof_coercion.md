# Preval test case

# custom_valueof_coercion.md

> Math > Ai > Custom valueof coercion
>
> Custom valueOf affecting numeric result

## Input

`````js filename=intro
const obj = { valueOf: () => 0.1 + 0.2 };
const x = obj + 0.6;
$(x);
// Should be 0.30000000000000004 + 0.6 = 0.9000000000000001
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>number*/ = function () {
  debugger;
  return 0.30000000000000004;
};
const obj /*:object*/ /*truthy*/ = { valueOf: tmpObjLitVal };
const x /*:primitive*/ = obj + 0.6;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  return 0.30000000000000004;
};
$({ valueOf: tmpObjLitVal } + 0.6);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return 0.30000000000000004;
};
const b = { valueOf: a };
const c = b + 0.6;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return 0.30000000000000004;
};
const obj = { valueOf: tmpObjLitVal };
const x = obj + 0.6;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
