# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > For in left > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for ((b = 2).x in $({ x: 1 }));
$(a, b, c);
`````


## Settled


`````js filename=intro
let b /*:number*/ /*truthy*/ = 1;
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    b = 2;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    (2).x = tmpAssignMemRhs;
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = 1;
const tmpForInGenNext = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    b = 2;
    const tmpAssignMemRhs = tmpForInNext.value;
    (2).x = tmpAssignMemRhs;
  }
}
$({ a: 999, b: 1000 }, b, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = { x: 1 };
const c = $( b );
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    a = 2;
    const g = e.value;
    2.x = g;
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h, a, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = { x: 1 };
let tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForInGenNext = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGenNext();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    b = 2;
    const tmpAssignMemLhsObj = b;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
