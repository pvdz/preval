# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic and and
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = $($(1)) && $($(1)) && $($(2));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$1);
    $(undefined);
  } else {
    $(tmpClusterSSA_a);
    $(undefined);
  }
} else {
  $(a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $($($(2)));
    $(undefined);
  } else {
    $(tmpClusterSSA_a);
    $(undefined);
  }
} else {
  $(a);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( undefined );
  }
  else {
    $( d );
    $( undefined );
  }
}
else {
  $( b );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = $(1);
  let a = $(tmpCalleeParam);
  if (a) {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
      return undefined;
    } else {
      $(a);
      return undefined;
    }
  } else {
    $(a);
    return undefined;
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
