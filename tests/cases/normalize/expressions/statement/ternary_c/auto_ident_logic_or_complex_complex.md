# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $($(0)) || $($(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(0);
  const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    $(a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(2);
    $(tmpCalleeParam$1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  if ($($(0))) {
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
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 100 );
  $( b );
}
else {
  const c = $( 0 );
  const d = $( c );
  if (d) {
    $( b );
  }
  else {
    const e = $( 2 );
    $( e );
    $( b );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a);
} else {
  let tmpCalleeParam = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
    $(a);
  } else {
    let tmpCalleeParam$1 = $(2);
    $(tmpCalleeParam$1);
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
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
