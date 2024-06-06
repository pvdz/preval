# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = [x, y] = ($(x), $(y), [$(3), $(4)]);
}
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = [x, y] = ($(x), $(y), [$(3), $(4)]);
  } else {
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = tmpNestedAssignArrPatternRhs;
} else {
}
$(a, x, y);
`````

## Output


`````js filename=intro
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_x = arrPatternSplat[0];
  const tmpClusterSSA_y = arrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  const a = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  $( 1 );
  $( 2 );
  const d = $( 3 );
  const e = $( 4 );
  const f = [ d, e ];
  const g = [ ... f ];
  const h = g[ 0 ];
  const i = g[ 1 ];
  $( f, h, i );
}
else {
  const j = {
a: 999,
b: 1000
  ;
  $( j, 1, 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
