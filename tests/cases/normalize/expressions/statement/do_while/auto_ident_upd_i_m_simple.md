# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b--);
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$({ a: 999, b: 1000 }, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
$( a, -1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
