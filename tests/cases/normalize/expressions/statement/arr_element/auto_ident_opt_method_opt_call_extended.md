# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
b?.c.d.e?.(1) + b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
const tmpObjLitVal$1 /*:object*/ = { e: $ };
if (tmpIfTest$1) {
} else {
  tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainElementObject$9 /*:unknown*/ = tmpObjLitVal$1.e;
const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$9 == null;
if (tmpIfTest$5) {
} else {
  tmpBinBothRhs = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpIfTest$1 = $ == null;
const tmpObjLitVal$1 = { e: $ };
if (!tmpIfTest$1) {
  tmpBinBothLhs = $dotCall($, tmpObjLitVal$1, `e`, 1);
}
let tmpBinBothRhs = undefined;
const tmpChainElementObject$9 = tmpObjLitVal$1.e;
if (!(tmpChainElementObject$9 == null)) {
  tmpBinBothRhs = $dotCall(tmpChainElementObject$9, tmpObjLitVal$1, `e`, 1);
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
const c = { e: $ };
if (b) {

}
else {
  a = $dotCall( $, c, "e", 1 );
}
let d = undefined;
const e = c.e;
const f = e == null;
if (f) {

}
else {
  d = $dotCall( e, c, "e", 1 );
}
a + d;
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
