# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) &&
  ((10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpIfTest$3 /*:unknown*/ = $(30);
  if (tmpIfTest$3) {
    $(60);
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
let tmpIfTest = undefined;
if ($(30)) {
  tmpIfTest = $(60);
} else {
  tmpIfTest = $($(100));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  if ($(30)) {
    $(60);
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
let a = undefined;
const b = $( 30 );
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
  const e = $( 30 );
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
else {
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 30
 - 4: 60
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
