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
  const tmpForOfNext /*:unknown*/ = tmpForOfGen();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject$3 /*:unknown*/ = tmpObjLitVal$1.e;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$3 == null;
    if (tmpIfTest$3) {
    } else {
      a = $dotCall(tmpChainElementObject$3, tmpObjLitVal$1, `e`, 1);
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
  const tmpForOfNext = tmpForOfGen();
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
  const f = d();
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
      a = $dotCall( h, e, "e", 1 );
    }
    const j = f.value;
    a.x = j;
  }
}
$( a );
`````


## Todos triggered


- (todo) objects in isFree check


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
