# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Switch case test > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case ([x, y] = [$(3), $(4)]):
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
  if (tmpSwitchDisc === ([x, y] = [$(3), $(4)])) {
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
let tmpBinBothRhs = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a, x, y);
`````

## Output


`````js filename=intro
$(1);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpArrElement, tmpArrElement$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope