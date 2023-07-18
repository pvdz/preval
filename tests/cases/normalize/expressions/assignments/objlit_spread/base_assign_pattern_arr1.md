# Preval test case

# base_assign_pattern_arr1.md

> Normalize > Expressions > Assignments > Objlit spread > Base assign pattern arr1
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$({ ...([b] = b) });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$({ ...([b] = b) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjSpread = undefined;
const tmpNestedAssignArrPatternRhs = b;
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpObjSpread = tmpNestedAssignArrPatternRhs;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = [];
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { ...b };
$(tmpCalleeParam);
$(a, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = {
a: 999,
b: 1000
;
const c = { ... a };
$( c );
$( b, undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: { a: '999', b: '1000' }, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
