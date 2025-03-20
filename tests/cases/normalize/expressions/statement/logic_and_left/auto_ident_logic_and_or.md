# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Logic and left > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(($($(1)) && $($(1))) || $($(2))) && $(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
    $(a);
  } else {
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = $($(1));
if (tmpIfTest) {
  tmpIfTest = $($(1));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  if ($($(2))) {
    $(100);
    $(a);
  } else {
    $(a);
  }
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
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  $( 100 );
  $( d );
}
else {
  const e = $( 2 );
  const f = $( e );
  if (f) {
    $( 100 );
    $( d );
  }
  else {
    $( d );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
