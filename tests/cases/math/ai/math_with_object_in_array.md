# Preval test case

# math_with_object_in_array.md

> Math > Ai > Math with object in array
>
> Math.max with array of objects with valueOf

## Input

`````js filename=intro
const arr = [{ valueOf: () => 3 }, { valueOf: () => 7 }];
const a = $(Math.max(...arr));
$(a);
// Should be 7
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>number*/ = function $pcompiled() {
  debugger;
  return 3;
};
const tmpObjLitVal$1 /*:()=>number*/ = function $pcompiled() {
  debugger;
  return 7;
};
const tmpArrElement /*:object*/ /*truthy*/ = { valueOf: tmpObjLitVal };
const tmpArrElement$1 /*:object*/ /*truthy*/ = { valueOf: tmpObjLitVal$1 };
const tmpCalleeParam /*:number*/ = $Math_max(tmpArrElement, tmpArrElement$1);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function $pcompiled() {
  return 3;
};
const tmpObjLitVal$1 = function $pcompiled() {
  return 7;
};
const tmpArrElement = { valueOf: tmpObjLitVal };
$($($Math_max(tmpArrElement, { valueOf: tmpObjLitVal$1 })));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return 3;
};
const c = function b() {
  debugger;
  return 7;
};
const d = { valueOf: a };
const e = { valueOf: c };
const f = $Math_max( d, e );
const g = $( f );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return 3;
};
const tmpArrElement = { valueOf: tmpObjLitVal };
const tmpObjLitVal$1 = function () {
  debugger;
  return 7;
};
const tmpArrElement$1 = { valueOf: tmpObjLitVal$1 };
const arr = [tmpArrElement, tmpArrElement$1];
const tmpMCF = $Math_max;
let tmpCalleeParam = $Math_max(...arr);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - 2: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
