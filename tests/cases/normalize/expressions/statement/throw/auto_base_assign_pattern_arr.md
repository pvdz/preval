# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Throw > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
throw ([b] = $([$(2)]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
throw ([b] = $([$(2)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpThrowArg = undefined;
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpThrowArg = tmpNestedAssignArrPatternRhs;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
throw tmpNestedAssignArrPatternRhs;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ... c ];
d[ 0 ];
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
