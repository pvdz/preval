# Preval test case

# do_block_test.md

> Normalize > Pattern > Assignment > Do block test
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let a = 1, b = [10, 20], x = 3, y = 4, p, q;
do { [p, q] = $(b); } while (x + y);
$(p, q);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = [10, 20],
  x = 3,
  y = 4,
  p,
  q;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      [p, q] = $(b);
    }
    tmpDoWhileFlag = x + y;
  }
}
$(p, q);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = [10, 20];
let x = 3;
let y = 4;
let p = undefined;
let q = undefined;
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    const arrAssignPatternRhs = $(b);
    const arrPatternSplat = [...arrAssignPatternRhs];
    p = arrPatternSplat[0];
    q = arrPatternSplat[1];
    tmpDoWhileFlag = x + y;
  } else {
    break;
  }
}
$(p, q);
`````

## Output

`````js filename=intro
const b = [10, 20];
const arrAssignPatternRhs = $(b);
const arrPatternSplat = [...arrAssignPatternRhs];
arrPatternSplat[0];
arrPatternSplat[1];
const arrAssignPatternRhs$1 = $(b);
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
arrPatternSplat$1[0];
arrPatternSplat$1[1];
const arrAssignPatternRhs$2 = $(b);
const arrPatternSplat$2 = [...arrAssignPatternRhs$2];
arrPatternSplat$2[0];
arrPatternSplat$2[1];
const arrAssignPatternRhs$3 = $(b);
const arrPatternSplat$3 = [...arrAssignPatternRhs$3];
arrPatternSplat$3[0];
arrPatternSplat$3[1];
const arrAssignPatternRhs$4 = $(b);
const arrPatternSplat$4 = [...arrAssignPatternRhs$4];
arrPatternSplat$4[0];
arrPatternSplat$4[1];
const arrAssignPatternRhs$5 = $(b);
const arrPatternSplat$5 = [...arrAssignPatternRhs$5];
arrPatternSplat$5[0];
arrPatternSplat$5[1];
const arrAssignPatternRhs$6 = $(b);
const arrPatternSplat$6 = [...arrAssignPatternRhs$6];
arrPatternSplat$6[0];
arrPatternSplat$6[1];
const arrAssignPatternRhs$7 = $(b);
const arrPatternSplat$7 = [...arrAssignPatternRhs$7];
arrPatternSplat$7[0];
arrPatternSplat$7[1];
const arrAssignPatternRhs$8 = $(b);
const arrPatternSplat$8 = [...arrAssignPatternRhs$8];
arrPatternSplat$8[0];
arrPatternSplat$8[1];
const arrAssignPatternRhs$9 = $(b);
const arrPatternSplat$9 = [...arrAssignPatternRhs$9];
arrPatternSplat$9[0];
arrPatternSplat$9[1];
const arrAssignPatternRhs$10 = $(b);
const arrPatternSplat$10 = [...arrAssignPatternRhs$10];
let tmpSSA_p$2 = arrPatternSplat$10[0];
let tmpSSA_q$2 = arrPatternSplat$10[1];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const arrAssignPatternRhs$11 = $(b);
  const arrPatternSplat$11 = [...arrAssignPatternRhs$11];
  tmpSSA_p$2 = arrPatternSplat$11[0];
  tmpSSA_q$2 = arrPatternSplat$11[1];
}
$(tmpSSA_p$2, tmpSSA_q$2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $( a );
const c = [ ... b ];
c[ 0 ];
c[ 1 ];
const d = $( a );
const e = [ ... d ];
e[ 0 ];
e[ 1 ];
const f = $( a );
const g = [ ... f ];
g[ 0 ];
g[ 1 ];
const h = $( a );
const i = [ ... h ];
i[ 0 ];
i[ 1 ];
const j = $( a );
const k = [ ... j ];
k[ 0 ];
k[ 1 ];
const l = $( a );
const m = [ ... l ];
m[ 0 ];
m[ 1 ];
const n = $( a );
const o = [ ... n ];
o[ 0 ];
o[ 1 ];
const p = $( a );
const q = [ ... p ];
q[ 0 ];
q[ 1 ];
const r = $( a );
const s = [ ... r ];
s[ 0 ];
s[ 1 ];
const t = $( a );
const u = [ ... t ];
u[ 0 ];
u[ 1 ];
const v = $( a );
const w = [ ... v ];
let x = w[ 0 ];
let y = w[ 1 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const z = $( a );
  const 01 = [ ... z ];
  x = 01[ 0 ];
  y = 01[ 1 ];
}
$( x, y );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [10, 20]
 - 2: [10, 20]
 - 3: [10, 20]
 - 4: [10, 20]
 - 5: [10, 20]
 - 6: [10, 20]
 - 7: [10, 20]
 - 8: [10, 20]
 - 9: [10, 20]
 - 10: [10, 20]
 - 11: [10, 20]
 - 12: [10, 20]
 - 13: [10, 20]
 - 14: [10, 20]
 - 15: [10, 20]
 - 16: [10, 20]
 - 17: [10, 20]
 - 18: [10, 20]
 - 19: [10, 20]
 - 20: [10, 20]
 - 21: [10, 20]
 - 22: [10, 20]
 - 23: [10, 20]
 - 24: [10, 20]
 - 25: [10, 20]
 - 26: [10, 20]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
