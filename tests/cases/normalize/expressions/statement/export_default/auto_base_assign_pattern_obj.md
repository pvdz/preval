# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Export default > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
export default { b } = $({ b: $(2) });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ({ b: b } = $({ b: $(2) }));
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output


`````js filename=intro
let tmpAnonDefaultExport = undefined;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
const a = { a: 999, b: 1000 };
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
export { a as default };
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
