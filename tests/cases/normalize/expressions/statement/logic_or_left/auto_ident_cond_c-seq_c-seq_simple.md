# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))) || $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:unknown*/ = $(30);
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
  $(100);
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
  $(a);
} else {
  $(100);
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
  $( d );
}
else {
  $( 100 );
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = $(30);
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  let tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
