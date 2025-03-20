# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))} after`;
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$3);
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(30)) {
  a = $(60);
} else {
  a = $($(100));
}
$([`before `, ` after`], a);
$(a);
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
const d = [ "before ", " after" ];
$( d, a );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: ['before ', ' after'], 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
