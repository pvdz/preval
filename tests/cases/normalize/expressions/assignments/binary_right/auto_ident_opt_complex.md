# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = $(b)?.x));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  a = tmpChainElementObject;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementObject;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let a = undefined;
const tmpChainElementCall = $({ x: 1 });
if (tmpChainElementCall == null) {
  $(tmpBinBothLhs + undefined);
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
  $(tmpBinBothLhs + tmpChainElementObject);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = $(b)?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = { x: 1 };
const d = $( c );
const e = d == null;
if (e) {
  const f = a + undefined;
  $( f );
}
else {
  const g = d.x;
  b = g;
  const h = a + g;
  $( h );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
