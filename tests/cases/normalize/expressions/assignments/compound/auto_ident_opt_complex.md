# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a *= $(b)?.x));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a *= $(b)?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpBinBothRhs = tmpChainElementObject;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
let tmpClusterSSA_a /*:number*/ = NaN;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  tmpClusterSSA_a = a * tmpChainElementObject;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = NaN;
const e = {
  a: 999,
  b: 1000,
};
if (c) {
  e ** 0;
  $( NaN );
}
else {
  const f = b.x;
  d = e * f;
  $( d );
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
