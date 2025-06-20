# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Logic or right > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || ($($(1)) && $($(1))) || $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(1);
  let tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
  if (tmpClusterSSA_tmpIfTest) {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpClusterSSA_tmpIfTest = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    $(tmpCalleeParam$3);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  let tmpClusterSSA_tmpIfTest = $($(1));
  if (tmpClusterSSA_tmpIfTest) {
    tmpClusterSSA_tmpIfTest = $($(1));
  }
  if (tmpClusterSSA_tmpIfTest) {
    $(a);
  } else {
    $($(2));
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( b );
}
else {
  const c = $( 1 );
  let d = $( c );
  if (d) {
    const e = $( 1 );
    d = $( e );
  }
  if (d) {
    $( b );
  }
  else {
    const f = $( 2 );
    $( f );
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(100);
if (tmpIfTest) {
  $(a);
} else {
  let tmpCalleeParam = $(1);
  tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    let tmpCalleeParam$1 = $(1);
    tmpIfTest = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest) {
    $(a);
  } else {
    let tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
    $(a);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
