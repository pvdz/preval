# Preval test case

# obj_obj_unique.md

> Normalize > Pattern > Param > Base alias > Obj obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let a = 1;
function i({x: {y: {z: a}}}) {
  {
    let a = 2;
  }
  return a;
}
$(i({x: {y: {z: {a: 10}}}}));
`````


## Settled


`````js filename=intro
const tmpObjLitVal$3 /*:object*/ = { a: 10 };
$(tmpObjLitVal$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 10 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 10 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpOPND$1 = tmpOPND.y;
  let a$1 = tmpOPND$1.z;
  let a$3 = 2;
  return a$1;
};
let a = 1;
const tmpCallCallee = i;
const tmpObjLitVal$3 = { a: 10 };
const tmpObjLitVal$1 = { z: tmpObjLitVal$3 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let tmpCalleeParam$1 = { x: tmpObjLitVal };
let tmpCalleeParam = i(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
