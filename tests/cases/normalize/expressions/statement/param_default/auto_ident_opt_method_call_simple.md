# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
function f(p = b?.c(1)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
$dotCall($, b, `c`, 1);
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($, { c: $ }, `c`, 1);
$(undefined);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
$dotCall( $, a, "c", 1 );
$( undefined );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
