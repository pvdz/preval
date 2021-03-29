# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For in right > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Options

Known TDZ problem

- skipEval

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 in (a = [x$1, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x$1 = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpForInDeclRhs = a;
let x$1;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x, y);
`````

## Output

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
const tmpSSA_y = arrPatternSplat[1];
let x$1;
for (x$1 in tmpNestedAssignArrPatternRhs) {
}
$(tmpNestedAssignArrPatternRhs, 1, tmpSSA_y);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
