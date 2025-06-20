# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && $($(2)));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  const tmpClusterSSA_a$1 = $($(2));
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
    return a;
  } else {
    return a;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
