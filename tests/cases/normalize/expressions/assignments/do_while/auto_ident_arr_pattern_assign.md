# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Do while > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = [x, y] = [$(3), $(4)])) {
  } else {
    break;
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
$(3);
$(4);
$(100);
const tmpArrElement$2 = $(3);
const tmpArrElement$4 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$2, tmpArrElement$4];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
let tmpSSA_x$2 = arrPatternSplat$1[0];
let tmpSSA_y$2 = arrPatternSplat$1[1];
let tmpSSA_a$2 = tmpNestedAssignArrPatternRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$2 = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$2 = [...tmpNestedAssignArrPatternRhs$2];
  tmpSSA_x$2 = arrPatternSplat$2[0];
  tmpSSA_y$2 = arrPatternSplat$2[1];
  tmpSSA_a$2 = tmpNestedAssignArrPatternRhs$2;
}
$(tmpSSA_a$2, tmpSSA_x$2, tmpSSA_y$2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
$( 3 );
$( 4 );
$( 100 );
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ... c ];
let e = d[ 0 ];
let f = d[ 1 ];
let g = c;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const h = $( 3 );
  const i = $( 4 );
  const j = [ h, i ];
  const k = [ ... j ];
  e = k[ 0 ];
  f = k[ 1 ];
  g = j;
}
$( g, e, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: 100
 - 5: 3
 - 6: 4
 - 7: 100
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 100
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 100
 - 20: 3
 - 21: 4
 - 22: 100
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
