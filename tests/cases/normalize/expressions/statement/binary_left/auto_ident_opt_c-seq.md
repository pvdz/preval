# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Binary left > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x + $(100);
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
const tmpBinBothRhs /*:unknown*/ = $(100);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const tmpChainRootProp = $({ x: 1 });
if (!(tmpChainRootProp == null)) {
  tmpBinBothLhs = tmpChainRootProp.x;
}
tmpBinBothLhs + $(100);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
(1, 2, $(b))?.x + $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpBinBothLhs = tmpChainElementObject;
} else {
}
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
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
const f = $( 100 );
a + f;
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
