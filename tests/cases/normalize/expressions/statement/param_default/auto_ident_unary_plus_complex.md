# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = +$(100)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
+tmpUnaryArg;
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
+tmpUnaryArg;
$(undefined);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
+a;
$( undefined );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
