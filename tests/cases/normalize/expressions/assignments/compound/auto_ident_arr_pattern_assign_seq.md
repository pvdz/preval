# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Compound > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a *= [x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$((a *= [x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, x, y);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_x = arrPatternSplat[0];
const tmpSSA_y = arrPatternSplat[1];
a = tmpBinBothLhs * tmpNestedAssignArrPatternRhs;
$(a);
$(a, tmpSSA_x, tmpSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = a;
$( 1 );
$( 2 );
const c = $( 3 );
const d = $( 4 );
const e = [ c, d ];
const f = [ ... e ];
const g = f[ 0 ];
const h = f[ 1 ];
a = b * e;
$( a );
$( a, g, h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: NaN
 - 6: NaN, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
