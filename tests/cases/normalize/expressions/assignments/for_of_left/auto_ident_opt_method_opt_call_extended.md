# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > For of left > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
for ((a = b?.c.d.e?.(1)).x of $({ x: 1 }));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpObjLitVal$1 /*:object*/ = { e: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject$3 /*:unknown*/ = tmpObjLitVal$1.e;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$3 == null;
    if (tmpIfTest$3) {
    } else {
      const tmpChainElementCall /*:unknown*/ = $dotCall(tmpChainElementObject$3, tmpObjLitVal$1, `e`, 1);
      a = tmpChainElementCall;
    }
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    a.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForOfGen = $forOf($({ x: 1 }));
const tmpObjLitVal$1 = { e: $ };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject$3 = tmpObjLitVal$1.e;
    if (!(tmpChainElementObject$3 == null)) {
      a = $dotCall(tmpChainElementObject$3, tmpObjLitVal$1, `e`, 1);
    }
    a.x = tmpForOfNext.value;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: { d: { e: $ } } };
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      (a = b?.c.d.e?.(1)).x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
let b = { c: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$1 = tmpChainRootProp != null;
    if (tmpIfTest$1) {
      const tmpChainElementObject = tmpChainRootProp.c;
      const tmpChainElementObject$1 = tmpChainElementObject.d;
      const tmpChainElementObject$3 = tmpChainElementObject$1.e;
      const tmpIfTest$3 = tmpChainElementObject$3 != null;
      if (tmpIfTest$3) {
        const tmpChainElementCall = $dotCall(tmpChainElementObject$3, tmpChainElementObject$1, `e`, 1);
        a = tmpChainElementCall;
      } else {
      }
    } else {
    }
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
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
const b = { x: 1 };
const c = $( b );
const d = $forOf( c );
const e = { e: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = d.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    a = undefined;
    const h = e.e;
    const i = h == null;
    if (i) {

    }
    else {
      const j = $dotCall( h, e, "e", 1 );
      a = j;
    }
    const k = f.value;
    a.x = k;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next
