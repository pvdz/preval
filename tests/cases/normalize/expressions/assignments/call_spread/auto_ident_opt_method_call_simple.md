# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$(...(a = b?.c(1)));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
$(...tmpChainElementCall);
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = { c: $ }.c(1);
$(...tmpChainElementCall);
$(tmpChainElementCall);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
$( ...b );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
