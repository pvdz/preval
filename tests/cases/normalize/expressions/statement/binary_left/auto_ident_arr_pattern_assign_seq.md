# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Binary left > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) + $(100);
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) + $(100);
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
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
const tmpClusterSSA_x = arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
const tmpBinBothRhs = $(100);
tmpNestedAssignArrPatternRhs + tmpBinBothRhs;
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
$( 1 );
$( 2 );
const b = $( 3 );
const c = $( 4 );
const d = [ b, c ];
const e = [ ... d ];
const f = e[ 0 ];
const g = e[ 1 ];
const h = $( 100 );
d + h;
$( a, f, g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 100
 - 6: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
