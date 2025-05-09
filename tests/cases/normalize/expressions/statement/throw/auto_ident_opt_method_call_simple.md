# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
throw b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpThrowArg /*:unknown*/ = $dotCall($, b, `c`, 1);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $dotCall($, { c: $ }, `c`, 1);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
throw b;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
