# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Bindings > Switch case > Auto ident logic or and
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || ($($(1)) && $($(2)));
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a$1) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$3 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$3);
  } else {
    $(tmpClusterSSA_a$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(1));
  if (tmpClusterSSA_a$1) {
    $($($(2)));
  } else {
    $(tmpClusterSSA_a$1);
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
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
  }
  else {
    $( d );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  let tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    $(a);
  } else {
    let tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      let tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      $(a);
    } else {
      $(a);
    }
  }
} else {
}
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
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
