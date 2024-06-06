# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
({ ...([x, y] = [$(3), $(4)]) });
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
({ ...([x, y] = [$(3), $(4)]) });
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpObjSpreadArg = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpObjSpreadArg = tmpNestedAssignArrPatternRhs;
({ ...tmpObjSpreadArg });
$(a, x, y);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
({ ...tmpNestedAssignArrPatternRhs });
$(a, tmpArrElement, tmpArrElement$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 3 );
const c = $( 4 );
const d = [ b, c ];
{ ... d };
$( a, b, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
