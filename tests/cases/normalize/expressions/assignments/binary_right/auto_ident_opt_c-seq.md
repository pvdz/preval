# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b))?.x));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
let a = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainRootProp = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
  const tmpClusterSSA_tmpCalleeParam$1 /*:primitive*/ = tmpBinBothLhs + tmpChainElementObject;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
