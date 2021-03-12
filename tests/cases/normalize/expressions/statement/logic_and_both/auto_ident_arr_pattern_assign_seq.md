# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Logic and both > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) && ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) && ([x, y] = ($(x), $(y), [$(3), $(4)]));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
  $(x);
  $(y);
  const tmpArrElement$2 = $(3);
  const tmpArrElement$3 = $(4);
  const arrAssignPatternRhs = [tmpArrElement$2, tmpArrElement$3];
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
}
$(a, x, y);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
let SSA_x = arrPatternSplat[0];
let SSA_y = arrPatternSplat[1];
if (tmpNestedAssignArrPatternRhs) {
  $(SSA_x);
  $(SSA_y);
  const tmpArrElement$2 = $(3);
  const tmpArrElement$3 = $(4);
  const arrAssignPatternRhs = [tmpArrElement$2, tmpArrElement$3];
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  SSA_x = arrPatternSplat$1[0];
  SSA_y = arrPatternSplat$1[1];
}
$(a, SSA_x, SSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 3
 - 6: 4
 - 7: 3
 - 8: 4
 - 9: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
