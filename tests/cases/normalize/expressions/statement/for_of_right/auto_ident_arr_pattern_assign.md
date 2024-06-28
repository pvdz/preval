# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > For of right > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Options

TDZ

- skipEval

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x of ([x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
for (let x$1 of ([x$1, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x$1 = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpForOfDeclRhs = tmpNestedAssignArrPatternRhs;
let x$1 = undefined;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x, y);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
let x$1 = undefined;
for (x$1 of tmpNestedAssignArrPatternRhs) {
}
$(a, 1, tmpClusterSSA_y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $( 3 );
const c = $( 4 );
const d = [ b, c ];
const e = [ ... d ];
e[ 0 ];
const f = e[ 1 ];
let g = undefined;
for (g of d) {

}
$( a, 1, f );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
