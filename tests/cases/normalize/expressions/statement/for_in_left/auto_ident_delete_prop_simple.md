# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((delete arg.y).x in $({ x: 1 }));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
const arg /*:object*/ = { y: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj /*:boolean*/ = delete arg.y;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGenNext = $forIn($({ x: 1 }));
const arg = { y: 1 };
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj = delete arg.y;
    tmpAssignMemLhsObj.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = { y: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = delete d.y;
    const h = e.value;
    g.x = h;
  }
}
const i = {
  a: 999,
  b: 1000,
};
$( i, d );
`````


## Todos triggered


- (todo) convert this Boolean trap to the symbo pattern
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on boolean 'true' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
