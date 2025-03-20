# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Statement > Binary right > Auto ident opt method opt call extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
$(100) + b?.c.d.e?.(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpObjLitVal$1 /*:object*/ = { e: $ };
  const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
  tmpBinBothRhs = tmpChainElementCall;
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
if (!($ == null)) {
  tmpBinBothRhs = $dotCall($, { e: $ }, `e`, 1);
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = { e: $ };
  const e = $dotCall( $, d, "e", 1 );
  b = e;
}
a + b;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
