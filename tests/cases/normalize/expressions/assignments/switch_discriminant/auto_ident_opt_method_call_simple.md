# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
switch ((a = b?.c(1))) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const a /*:unknown*/ = $dotCall($, b, `c`, 1);
$(100);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $dotCall($, { c: $ }, `c`, 1);
$(100);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
$( 100 );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
