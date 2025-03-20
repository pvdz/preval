# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Label > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
label: b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
b.c(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({ c: $ }.c(1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
a.c( 1 );
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
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
