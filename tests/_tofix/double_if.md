# Preval test case

# double_if.md

> Tests > Tofix > Double if
>
> The two ifs, back to back, can be merged, no matter what the code actually does

## Input

`````js filename=intro
const bool = Boolean($(true));
let x = undefined;
if (bool) {
  x = e$661 & $(tmpFree$105, tmpClusterSSA_n$63);
} else {
  x = e$661 & $(tmpFree$107, tmpClusterSSA_n$63);
}
let y = undefined;
if (i$399) {
  y = x >>> (8 * tmpClusterSSA_n$63);
} else {
  y = x >>> $(tmpFree$109, tmpClusterSSA_n$63);
}
$(x, y);
`````

## Pre Normal


`````js filename=intro
const bool = Boolean($(true));
let x = undefined;
if (bool) {
  x = e$661 & $(tmpFree$105, tmpClusterSSA_n$63);
} else {
  x = e$661 & $(tmpFree$107, tmpClusterSSA_n$63);
}
let y = undefined;
if (i$399) {
  y = x >>> (8 * tmpClusterSSA_n$63);
} else {
  y = x >>> $(tmpFree$109, tmpClusterSSA_n$63);
}
$(x, y);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = Boolean;
const tmpCalleeParam = $(true);
const bool = tmpCallCallee(tmpCalleeParam);
let x = undefined;
if (bool) {
  const tmpBinBothLhs = e$661;
  const tmpBinBothRhs = $(tmpFree$105, tmpClusterSSA_n$63);
  x = tmpBinBothLhs & tmpBinBothRhs;
} else {
  const tmpBinBothLhs$1 = e$661;
  const tmpBinBothRhs$1 = $(tmpFree$107, tmpClusterSSA_n$63);
  x = tmpBinBothLhs$1 & tmpBinBothRhs$1;
}
let y = undefined;
if (i$399) {
  const tmpBinBothLhs$3 = x;
  const tmpBinBothRhs$3 = 8 * tmpClusterSSA_n$63;
  y = tmpBinBothLhs$3 >>> tmpBinBothRhs$3;
} else {
  const tmpBinBothLhs$5 = x;
  const tmpBinBothRhs$5 = $(tmpFree$109, tmpClusterSSA_n$63);
  y = tmpBinBothLhs$5 >>> tmpBinBothRhs$5;
}
$(x, y);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(true);
let x /*:number*/ = 0;
const tmpBinBothLhs = e$661;
if (tmpCalleeParam) {
  const tmpBinBothRhs = $(tmpFree$105, tmpClusterSSA_n$63);
  x = tmpBinBothLhs & tmpBinBothRhs;
} else {
  const tmpBinBothRhs$1 = $(tmpFree$107, tmpClusterSSA_n$63);
  x = tmpBinBothLhs & tmpBinBothRhs$1;
}
if (i$399) {
  const tmpBinBothRhs$3 /*:number*/ = 8 * tmpClusterSSA_n$63;
  const tmpClusterSSA_y /*:number*/ = x >>> tmpBinBothRhs$3;
  $(x, tmpClusterSSA_y);
} else {
  const tmpBinBothRhs$5 = $(tmpFree$109, tmpClusterSSA_n$63);
  const tmpClusterSSA_y$1 /*:number*/ = x >>> tmpBinBothRhs$5;
  $(x, tmpClusterSSA_y$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
let b = 0;
const c = e$661;
if (a) {
  const d = $( tmpFree$105, tmpClusterSSA_n$63 );
  b = c & d;
}
else {
  const e = $( tmpFree$107, tmpClusterSSA_n$63 );
  b = c & e;
}
if (i$399) {
  const f = 8 * tmpClusterSSA_n$63;
  const g = b >>> f;
  $( b, g );
}
else {
  const h = $( tmpFree$109, tmpClusterSSA_n$63 );
  const i = b >>> h;
  $( b, i );
}
`````

## Globals

BAD@! Found 6 implicit global bindings:

e$661, tmpFree$105, tmpClusterSSA_n$63, tmpFree$107, i$399, tmpFree$109

## Result

Should call `$` with:
 - 1: true
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
