# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? (40, 50, 60) : $($(100))) ||
  ((10, 20, $(30)) ? (40, 50, 60) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = 1;
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 /*:unknown*/ = $(30);
  if (tmpIfTest$3) {
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
let tmpIfTest = 1;
if (!$(30)) {
  tmpIfTest = $($(100));
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  if ($(30)) {
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
let a = 1;
const b = $( 30 );
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
  $( d );
}
else {
  const e = $( 30 );
  if (e) {
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
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpIfTest = 60;
} else {
  let tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpIfTest$3 = $(30);
  if (tmpIfTest$3) {
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
 - 1: 30
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
