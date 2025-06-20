# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(1)) && 2} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, 2);
  $(a);
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $($(1));
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, 2);
  $(a);
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = [ "before ", " after" ];
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c, 2 );
  $( d );
}
else {
  $( c, b );
  $( d );
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
  tmpCalleeParam$1 = 2;
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
