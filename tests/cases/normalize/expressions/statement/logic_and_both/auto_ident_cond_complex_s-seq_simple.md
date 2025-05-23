# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
($(1) ? (40, 50, 60) : $($(100))) && ($(1) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = 1;
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpIfTest$3 /*:unknown*/ = $(1);
  if (tmpIfTest$3) {
    $(a);
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(100);
    $(tmpCalleeParam$1);
    $(a);
  }
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = 1;
if (!$(1)) {
  tmpIfTest = $($(100));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($(1)) {
    $(a);
  } else {
    $($(100));
    $(a);
  }
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
const b = $( 1 );
if (b) {

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
  const e = $( 1 );
  if (e) {
    $( d );
  }
  else {
    const f = $( 100 );
    $( f );
    $( d );
  }
}
else {
  $( d );
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
