# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, $(60)) : $($(100))) || ($(1) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 /*:unknown*/ = $(1);
  if (tmpIfTest$3) {
    $(60);
    $(a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    $(tmpCalleeParam$1);
    $(a);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
if ($(1)) {
  tmpIfTest = $(60);
} else {
  tmpIfTest = $($(100));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($(1)) {
    $(60);
    $(a);
  } else {
    $($(100));
    $(a);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  a = $( 60 );
}
else {
  const c = $( 100 );
  a = $( c );
}
const d = {
  a: 999,
  b: 1000,
};
if (a) {
  $( d );
}
else {
  const e = $( 1 );
  if (e) {
    $( 60 );
    $( d );
  }
  else {
    const f = $( 100 );
    $( f );
    $( d );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  let tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 = $(1);
  if (tmpIfTest$3) {
    $(60);
    $(a);
  } else {
    let tmpCalleeParam$1 = $(100);
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
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
