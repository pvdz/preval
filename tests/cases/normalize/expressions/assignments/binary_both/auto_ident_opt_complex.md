# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.x) + (a = $(b)?.x));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $(b)?.x) + (a = $(b)?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
const tmpIfTest$1 = tmpChainElementCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainElementCall$1.x;
  a = tmpChainElementObject$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpBinBothLhs = tmpChainElementObject;
}
let tmpClusterSSA_a = undefined;
const tmpChainElementCall$1 = $(b);
const tmpIfTest$1 = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementObject$1 = tmpChainElementCall$1.x;
  tmpClusterSSA_a = tmpChainElementObject$1;
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + tmpChainElementObject$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
let d = undefined;
if (c) {

}
else {
  const e = b.x;
  d = e;
}
let f = undefined;
const g = $( a );
const h = g == null;
if (h) {
  const i = d + undefined;
  $( i );
}
else {
  const j = g.x;
  f = j;
  const k = d + j;
  $( k );
}
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
