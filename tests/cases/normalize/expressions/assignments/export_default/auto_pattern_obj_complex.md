# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Export default > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
export default { a } = $({ a: 1, b: 2 });
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ({ a: a } = $({ a: 1, b: 2 }));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpAnonDefaultExport = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
let tmpAnonDefaultExport /*:unknown*/ = undefined;
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignObjPatternRhs.a;
tmpAnonDefaultExport = tmpNestedAssignObjPatternRhs;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
a = c;
export { a as default };
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
