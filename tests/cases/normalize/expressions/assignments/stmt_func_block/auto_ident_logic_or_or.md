# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = $($(0)) || $($(1)) || $($(2));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
    $(undefined);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$1);
    $(undefined);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(a);
  $(undefined);
} else {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
    $(undefined);
  } else {
    $($($(2)));
    $(undefined);
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
  $( undefined );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $( d );
    $( undefined );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( undefined );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    $(a);
    return undefined;
  } else {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      $(a);
      return undefined;
    } else {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
      return undefined;
    }
  }
};
let tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
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
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
