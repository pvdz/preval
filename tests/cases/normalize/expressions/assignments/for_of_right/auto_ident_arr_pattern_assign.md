# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > For of right > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Options

Known TDZ problem

- skipEval

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x of (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 of (a = [x$1, y] = [$(3), $(4)]));
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
let tmpForOfDeclRhs = a;
let x$1 = undefined;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x, y);
`````

## Output


`````js filename=intro
$(3);
$(4);
throw `Preval: Cannot access \`x\$1\` before initialization`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
$( 4 );
throw "Preval: Cannot access `x$1` before initialization";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
