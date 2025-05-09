# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
b?.c(1) && b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpIfTest /*:unknown*/ = $dotCall($, b, `c`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpChainElementObject$1 /*:unknown*/ = b.c;
  $dotCall(tmpChainElementObject$1, b, `c`, 1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: $ };
const tmpIfTest = $dotCall($, b, `c`, 1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  b.c(1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = a.c;
  $dotCall( d, a, "c", 1 );
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
