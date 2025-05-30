# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
throw (a = b?.c.d.e(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpThrowArg /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $dotCall($, { e: $ }, `e`, 1);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
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
