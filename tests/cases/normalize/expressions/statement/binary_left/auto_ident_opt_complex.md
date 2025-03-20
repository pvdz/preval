# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Binary left > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.x + $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
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
const tmpChainElementCall = $({ x: 1 });
if (!(tmpChainElementCall == null)) {
  tmpBinBothLhs = tmpChainElementCall.x;
}
tmpBinBothLhs + $(100);
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
