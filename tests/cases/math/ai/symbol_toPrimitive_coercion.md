# Preval test case

# symbol_toPrimitive_coercion.md

> Math > Ai > Symbol toPrimitive coercion
>
> Symbol.toPrimitive custom coercion

## Input

`````js filename=intro
const obj = { [Symbol.toPrimitive]: () => 0.1 + 0.2 };
const x = obj + 0.6;
$(x);
// Should be 0.30000000000000004 + 0.6 = 0.9000000000000001
`````


## Settled


`````js filename=intro
const tmpObjLitPropKey /*:unknown*/ = Symbol.toPrimitive;
const tmpObjLitPropVal /*:()=>number*/ = function $pcompiled() {
  debugger;
  return 0.30000000000000004;
};
const obj /*:object*/ /*truthy*/ = { [tmpObjLitPropKey]: tmpObjLitPropVal };
const x /*:primitive*/ = obj + 0.6;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitPropKey = Symbol.toPrimitive;
const tmpObjLitPropVal = function $pcompiled() {
  return 0.30000000000000004;
};
$({ [tmpObjLitPropKey]: tmpObjLitPropVal } + 0.6);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Symbol.toPrimitive;
const b = function c() {
  debugger;
  return 0.30000000000000004;
};
const d = { [ a ]: b };
const e = d + 0.6;
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitPropKey = Symbol.toPrimitive;
const tmpObjLitPropVal = function () {
  debugger;
  return 0.30000000000000004;
};
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
const x = obj + 0.6;
$(x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 0.9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
