# Preval test case

# math_with_symbol_toPrimitive.md

> Math > Ai > Math with symbol toPrimitive
>
> Math.abs with object using Symbol.toPrimitive

## Input

`````js filename=intro
const obj = { [Symbol.toPrimitive]: () => -99 };
const a = $(Math.abs(obj));
$(a);
// Should be 99
`````


## Settled


`````js filename=intro
const tmpObjLitPropKey /*:unknown*/ = Symbol.toPrimitive;
const tmpObjLitPropVal /*:()=>number*/ = function $pcompiled() {
  debugger;
  return -99;
};
const obj /*:object*/ /*truthy*/ = { [tmpObjLitPropKey]: tmpObjLitPropVal };
const tmpCalleeParam /*:number*/ = $Math_abs(obj);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitPropKey = Symbol.toPrimitive;
const tmpObjLitPropVal = function $pcompiled() {
  return -99;
};
$($($Math_abs({ [tmpObjLitPropKey]: tmpObjLitPropVal })));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Symbol.toPrimitive;
const b = function $pcompiled() {
  debugger;
  return -99;
};
const c = { [ a ]: b };
const d = $Math_abs( c );
const e = $( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitPropKey = Symbol.toPrimitive;
const tmpObjLitPropVal = function () {
  debugger;
  return -99;
};
const obj = { [tmpObjLitPropKey]: tmpObjLitPropVal };
const tmpMCF = $Math_abs;
let tmpCalleeParam = $Math_abs(obj);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 99
 - 2: 99
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
