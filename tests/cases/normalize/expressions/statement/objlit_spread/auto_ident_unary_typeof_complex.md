# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
({ ...typeof $(arg) });
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpObjSpreadArg /*:string*/ = typeof tmpUnaryArg;
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpObjSpreadArg = typeof tmpUnaryArg;
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
{ ... b };
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
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
