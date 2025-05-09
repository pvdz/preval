# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$((a = b?.c.d.e(1)) && (a = b?.c.d.e(1)));
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
  const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const a = $dotCall($, tmpObjLitVal$1, `e`, 1);
if (a) {
  const tmpNestedComplexRhs = tmpObjLitVal$1.e(1);
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
if (b) {
  const c = a.e;
  const d = $dotCall( c, a, "e", 1 );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
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
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
