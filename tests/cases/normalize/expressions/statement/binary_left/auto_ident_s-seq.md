# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Binary left > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
($(1), $(2), x) + $(100);
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpBinBothRhs /*:unknown*/ = $(100);
tmpBinBothRhs + 0;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(100) + 0;
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 100 );
a + 0;
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
