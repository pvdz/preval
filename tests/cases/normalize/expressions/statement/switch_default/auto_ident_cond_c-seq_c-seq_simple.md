# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest /*:unknown*/ = $(30);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpIfTest = $(30);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(60);
  $(a);
} else {
  $($(100));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 30 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 60 );
  $( b );
}
else {
  const c = $( 100 );
  $( c );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(60);
  $(a);
} else {
  let tmpCalleeParam = $(100);
  $(tmpCalleeParam);
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
 - 2: 30
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
