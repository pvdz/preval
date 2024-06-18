# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Bindings > Export > Auto base assign pattern obj
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

export let a = ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = ({ b: b } = $({ b: $(2) }));
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
let a = undefined;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
export { a };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 2 );
const c = { b: b };
const d = $( c );
const e = d.b;
a = d;
export { a as a };
$( a, e );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
