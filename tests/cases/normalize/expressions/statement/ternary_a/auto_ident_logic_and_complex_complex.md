# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1)) && $($(2)) ? $(100) : $(200);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpIfTest) {
    $(100);
    $(a);
  } else {
    $(200);
    $(a);
  }
} else {
  $(200);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(1));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($($(2))) {
    $(100);
    $(a);
  } else {
    $(200);
    $(a);
  }
} else {
  $(200);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( 2 );
  const e = $( d );
  if (e) {
    $( 100 );
    $( c );
  }
  else {
    $( 200 );
    $( c );
  }
}
else {
  $( 200 );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  let tmpCalleeParam$1 = $(2);
  tmpIfTest = $(tmpCalleeParam$1);
  if (tmpIfTest) {
    $(100);
    $(a);
  } else {
    $(200);
    $(a);
  }
} else {
  $(200);
  $(a);
}
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
 - 5: 100
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
