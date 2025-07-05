# Preval test case

# bad_obj.md

> Tofix > bad obj

tbd if this is a regression or existing bug. the "pahse2 change" made `a = undefined` when it was `a = {}` before. or maybe not even that.

settled before, correct eval:
/*
  let a /*:unknown*/ = { a: 999, b: 1000 };
  const tmpCalleeParam$1 /*:array*/ = [123];
  const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpObjLitVal$1 /*:object*/ = {};
  while ($LOOP_NO_UNROLLS_LEFT) {
    const tmpForOfNext /*:unknown*/ = tmpForOfGen();
    const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      a = tmpObjLitVal$1;                                       // <-- notable difference
      const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
      tmpObjLitVal$1.x = tmpAssignMemRhs;
    }
  }
  $(a);
*/

## Input

`````js filename=intro
let b = { x: { y: {} } };

let a = { a: 999, b: 1000 };
for ((a = b?.x?.y).x of $([123]));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [123];
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpObjLitVal$1 /*:object*/ /*truthy*/ = {};
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = tmpObjLitVal$1;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpObjLitVal$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($([123]));
const tmpObjLitVal$1 = {};
while (true) {
  const tmpForOfNext = tmpForOfGen();
  if (tmpForOfNext.done) {
    break;
  } else {
    a = tmpObjLitVal$1;
    tmpObjLitVal$1.x = tmpForOfNext.value;
  }
}
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = [ 123 ];
const c = $( b );
const d = $forOf( c );
const e = {};
while ($LOOP_NO_UNROLLS_LEFT) {
  const f = d();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    a = e;
    const h = f.value;
    e.x = h;
  }
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = {};
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = [123];
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpForOfNext = tmpForOfGen();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.x;
      const tmpIfTest$3 = tmpChainElementObject != null;
      if (tmpIfTest$3) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        a = tmpChainElementObject$1;
      } else {
      }
    } else {
    }
    const tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [123]
 - 2: { x: '123' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
