# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = ($($(1)) && $($(1))) || $($(2)))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$3);
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$5);
} else {
}
if (a) {
} else {
  const tmpCalleeParam$7 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$7);
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
if (!a) {
  a = $($(2));
}
$([`before `, ` after`], a);
$(a);
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
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
const e = [ "before ", " after" ];
$( e, b );
$( b );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
