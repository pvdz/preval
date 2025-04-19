# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = -$(100)).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpUnaryArg /*:unknown*/ = $(100);
    a = -tmpUnaryArg;
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    a.x = tmpAssignMemRhs;
  }
}
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpForInGenNext = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGenNext();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpUnaryArg = $(100);
    a = -tmpUnaryArg;
    a.x = tmpForInNext.value;
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
const d = $forIn( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( 100 );
    a = -g;
    const h = e.value;
    a.x = h;
  }
}
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - eval returned: ("<crash[ Cannot create property 'x' on number '-100' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
