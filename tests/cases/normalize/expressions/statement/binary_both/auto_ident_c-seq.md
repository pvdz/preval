# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Binary both > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) + ($(1), $(2), $(x));
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpBinBothLhs /*:unknown*/ = $(1);
$(1);
$(2);
const tmpBinBothRhs /*:unknown*/ = $(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpBinBothLhs = $(1);
$(1);
$(2);
tmpBinBothLhs + $(1);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( 1 );
$( 2 );
const b = $( 1 );
a + b;
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
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
