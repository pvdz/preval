# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > For in left > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = new ($($))($(1), $(2))).x in $({ x: 1 }));
$(a);
`````


## Settled


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpNewCallee /*:unknown*/ = $($);
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
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
const tmpForInGen = $forIn($({ x: 1 }));
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const tmpNewCallee = $($);
    const tmpCalleeParam$3 = $(1);
    const tmpCalleeParam$5 = $(2);
    a = new tmpNewCallee(tmpCalleeParam$3, tmpCalleeParam$5);
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
    const g = $( $ );
    const h = $( 1 );
    const i = $( 2 );
    a = new g( h, i );
    const j = e.value;
    a.x = j;
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
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: { x: '"x"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
