# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
({ ...$(b) });
$(a, b);
`````


## Settled


`````js filename=intro
const tmpObjSpreadArg /*:unknown*/ = $(1);
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = $(1);
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
{ ... a };
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
