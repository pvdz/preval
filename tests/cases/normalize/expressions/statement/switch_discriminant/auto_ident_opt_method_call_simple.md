# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
switch (b?.c(1)) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: $ };
$dotCall($, b, `c`, 1);
$(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($, { c: $ }, `c`, 1);
$(100);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
$dotCall( $, a, "c", 1 );
$( 100 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `c`, 1);
  tmpSwitchDisc = tmpChainElementCall;
  $(100);
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
