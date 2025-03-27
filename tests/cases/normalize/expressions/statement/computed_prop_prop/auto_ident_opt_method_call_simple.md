# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[b?.c(1)];
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = b.c(1);
$coerce(tmpChainElementCall, `string`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce({ c: $ }.c(1), `string`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = a.c( 1 );
$coerce( b, "string" );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
