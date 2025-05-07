# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(10, 20, $(30)) ? (40, 50, $(60)) : $($(100))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(60);
  $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$2);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(tmpCalleeParam, $(60));
  $(a);
} else {
  $(tmpCalleeParam, $($(100)));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = [ "before ", " after" ];
const c = {
  a: 999,
  b: 1000,
};
if (a) {
  const d = $( 60 );
  $( b, d );
  $( c );
}
else {
  const e = $( 100 );
  const f = $( e );
  $( b, f );
  $( c );
}
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: ['before ', ' after'], 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
