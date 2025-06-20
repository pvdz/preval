# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || $($(1)) || $($(2)));
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$3);
    $(tmpClusterSSA_a$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  } else {
    const tmpClusterSSA_a$3 = $($(2));
    $(tmpClusterSSA_a$3);
    $(tmpClusterSSA_a$3);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( b );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $( d );
    $( d );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( f );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    return a;
  } else {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      return a;
    } else {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      return a;
    }
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
