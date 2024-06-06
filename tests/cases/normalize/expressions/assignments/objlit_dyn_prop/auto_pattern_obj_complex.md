# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ [({ a } = $({ a: 1, b: 2 }))]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$({ [({ a: a } = $({ a: 1, b: 2 }))]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpObjLitPropKey = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpObjLitPropKey = tmpNestedAssignObjPatternRhs;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
const tmpCalleeParam = { [tmpNestedAssignObjPatternRhs]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 1,
b: 2
;
const b = $( a );
const c = b.a;
const d = { b[ 10 ]: 10 };
$( d );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { '[object Object]': '10' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
