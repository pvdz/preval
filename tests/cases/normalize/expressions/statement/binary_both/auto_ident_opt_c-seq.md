# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Binary both > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x + (1, 2, $(b))?.x;
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
  tmpBinBothLhs = tmpChainElementObject;
}
let tmpBinBothRhs /*:unknown*/ = undefined;
const tmpChainRootProp$1 /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainRootProp$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainRootProp$1.x;
  tmpBinBothRhs = tmpChainElementObject$1;
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const b = { x: 1 };
const tmpChainRootProp = $(b);
if (!(tmpChainRootProp == null)) {
  tmpBinBothLhs = tmpChainRootProp.x;
}
let tmpBinBothRhs = undefined;
const tmpChainRootProp$1 = $(b);
if (!(tmpChainRootProp$1 == null)) {
  tmpBinBothRhs = tmpChainRootProp$1.x;
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
let f = undefined;
const g = $( b );
const h = g == null;
if (h) {

}
else {
  const i = g.x;
  f = i;
}
a + f;
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
