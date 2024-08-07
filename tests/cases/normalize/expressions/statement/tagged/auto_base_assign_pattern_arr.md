# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Tagged > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$`before ${([b] = $([$(2)]))} after`;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$([`before `, ` after`], ([b] = $([$(2)])));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpCallCallee$1 = $;
const tmpArrElement = $(2);
const tmpCalleeParam$3 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee$1(tmpCalleeParam$3);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpCalleeParam$1 = tmpNestedAssignArrPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpArrElement = $(2);
const tmpCalleeParam$3 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$3);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
$(tmpCalleeParam, tmpNestedAssignArrPatternRhs);
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ "before ", " after" ];
const c = $( 2 );
const d = [ c ];
const e = $( d );
const f = [ ... e ];
const g = f[ 0 ];
$( b, e );
$( a, g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: ['before ', ' after'], [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
