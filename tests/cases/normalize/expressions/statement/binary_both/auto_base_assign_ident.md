# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Binary both > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) + (b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(2);
const tmpClusterSSA_b /*:unknown*/ = $(2);
tmpBinBothLhs + tmpClusterSSA_b;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(2);
const tmpClusterSSA_b = $(2);
tmpBinBothLhs + tmpClusterSSA_b;
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 2 );
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
