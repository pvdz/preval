# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Arr element > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ b } = $({ b: $(2) })) + ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
({ b: b } = $({ b: $(2) })) + ({ b: b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpBinBothLhs = tmpNestedAssignObjPatternRhs;
let tmpBinBothRhs = undefined;
const tmpCallCallee$1 = $;
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs$1.b;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
tmpNestedAssignObjPatternRhs.b;
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
const tmpSSA_b$1 = tmpNestedAssignObjPatternRhs$1.b;
tmpNestedAssignObjPatternRhs + tmpNestedAssignObjPatternRhs$1;
$(a, tmpSSA_b$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 2 );
const c = { b: b };
const d = $( c );
d.b;
const e = $( 2 );
const f = { b: e };
const g = $( f );
const h = g.b;
d + g;
$( a, h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 2
 - 4: { b: '2' }
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
