# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for ($(b).c.x in $({ x: 1 }));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
const b /*:object*/ = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpCompObj /*:unknown*/ = $(b);
    const tmpAssignMemLhsObj /*:unknown*/ = tmpCompObj.c;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForInGen = $forIn($({ x: 1 }));
const b = { c: 1 };
while (true) {
  const tmpForInNext = tmpForInGen.next();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(b).c;
    tmpAssignMemLhsObj.x = tmpForInNext.value;
  }
}
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $forIn( b );
const d = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = g.c;
    const i = e.value;
    h.x = i;
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, d );
`````


## Todos triggered


- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { c: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
