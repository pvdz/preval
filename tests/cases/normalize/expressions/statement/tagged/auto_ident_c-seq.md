# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Tagged > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${($(1), $(2), $(x))} after`;
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpCalleeParam$1 = $(1);
$([`before `, ` after`], tmpCalleeParam$1);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = [ "before ", " after" ];
$( b, a );
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
