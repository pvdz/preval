# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Objlit dyn prop > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
({ [({ b } = $({ b: $(2) }))]: 10 });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
({ [({ b: b } = $({ b: $(2) }))]: 10 });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpAssignObjPatternRhs.b;
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpAssignObjPatternRhs.b;
$(a, tmpClusterSSA_b);
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
const e = d.b;
$( a, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
