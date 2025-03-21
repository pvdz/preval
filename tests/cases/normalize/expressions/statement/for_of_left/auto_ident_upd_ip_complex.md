# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (($($(b)).x++).x of $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const b /*:object*/ = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(b);
    const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam$3);
    const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
    const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
    tmpUpdObj.x = tmpUpdInc;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpUpdNum.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfGen = $forOf($({ x: 1 }));
const b = { x: 1 };
while (true) {
  const tmpForOfNext = tmpForOfGen.next();
  if (tmpForOfNext.done) {
    break;
  } else {
    const tmpUpdObj = $($(b));
    const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
    tmpUpdObj.x = tmpUpdNum + 1;
    tmpUpdNum.x = tmpForOfNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forOf( b );
const d = { x: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = $( g );
    const i = h.x;
    const j = $coerce( i, "number" );
    const k = j + 1;
    h.x = k;
    const l = e.value;
    j.x = l;
  }
}
const m = {
  a: 999,
  b: 1000,
};
$( m, d );
`````


## Todos triggered


- (todo) objects in isFree check
- (todo) Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next


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
