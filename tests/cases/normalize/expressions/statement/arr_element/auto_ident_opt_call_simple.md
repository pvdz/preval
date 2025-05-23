# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) + $?.(1);
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  tmpBinBothLhs = $(1);
}
let tmpBinBothRhs /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = $ == null;
if (tmpIfTest$1) {
} else {
  tmpBinBothRhs = $(1);
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
if (!($ == null)) {
  tmpBinBothLhs = $(1);
}
let tmpBinBothRhs = undefined;
if (!($ == null)) {
  tmpBinBothRhs = $(1);
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  a = $( 1 );
}
let c = undefined;
const d = $ == null;
if (d) {

}
else {
  c = $( 1 );
}
a + c;
const e = {
  a: 999,
  b: 1000,
};
$( e );
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
