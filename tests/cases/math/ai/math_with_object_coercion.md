# Preval test case

# math_with_object_coercion.md

> Math > Ai > Math with object coercion
>
> Math.max with object with valueOf

## Input

`````js filename=intro
const obj = { valueOf: () => 10 };
const a = $(Math.max(5, obj));
$(a);
// Should be 10
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>number*/ = function $pcompiled() {
  debugger;
  return 10;
};
const obj /*:object*/ /*truthy*/ = { valueOf: tmpObjLitVal };
const tmpCalleeParam /*:number*/ = $Math_max(5, obj);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function $pcompiled() {
  return 10;
};
$($($Math_max(5, { valueOf: tmpObjLitVal })));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return 10;
};
const b = { valueOf: a };
const c = $Math_max( 5, b );
const d = $( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return 10;
};
const obj = { valueOf: tmpObjLitVal };
const tmpMCF = $Math_max;
let tmpCalleeParam = $Math_max(5, obj);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
