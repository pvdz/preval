# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt method call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e(1) || b?.c.d.e(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpIfTest /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpIfTest = $dotCall($, tmpObjLitVal$1, `e`, 1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  tmpObjLitVal$1.e(1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
}
else {
  const d = a.e;
  $dotCall( d, a, "e", 1 );
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
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
