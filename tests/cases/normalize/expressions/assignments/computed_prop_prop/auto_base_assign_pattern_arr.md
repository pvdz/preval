# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [b] = $([$(2)]))];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = [b] = $([$(2)]))];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const obj = {};
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
obj[tmpNestedAssignArrPatternRhs];
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
const f = e[ 0 ];
a[ d ];
$( d, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
