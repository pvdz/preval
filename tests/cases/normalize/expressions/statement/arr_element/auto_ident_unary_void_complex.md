# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
void $(100) + void $(100);
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$({ a: 999, b: 1000 });
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
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
