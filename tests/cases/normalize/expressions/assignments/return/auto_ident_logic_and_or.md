# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Return > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = ($($(1)) && $($(1))) || $($(2)));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$1);
} else {
}
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpClusterSSA_a = $($(1));
if (tmpClusterSSA_a) {
  tmpClusterSSA_a = $($(1));
}
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(2));
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( b );
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
  $( e );
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
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  } else {
  }
  if (a) {
    return a;
  } else {
    let tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
    return a;
  }
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
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
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
