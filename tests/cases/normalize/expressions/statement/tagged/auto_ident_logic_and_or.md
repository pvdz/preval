# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${($($(1)) && $($(1))) || $($(2))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
} else {
}
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$7);
  $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = $($(1));
if (tmpCalleeParam$1) {
  tmpCalleeParam$1 = $($(1));
}
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  $(tmpCalleeParam, $($(2)));
  $(a);
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
const d = [ "before ", " after" ];
const e = {
  a: 999,
  b: 1000,
};
if (b) {
  $( d, b );
  $( e );
}
else {
  const f = $( 2 );
  const g = $( f );
  $( d, g );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$3 = $(1);
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  let tmpCalleeParam$5 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
} else {
}
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  let tmpCalleeParam$7 = $(2);
  tmpCalleeParam$1 = $(tmpCalleeParam$7);
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
