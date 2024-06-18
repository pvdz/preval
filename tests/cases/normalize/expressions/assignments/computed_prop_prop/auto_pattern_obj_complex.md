# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
obj[({ a } = $({ a: 1, b: 2 }))];
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
let obj = {};
obj[({ a: a } = $({ a: 1, b: 2 }))];
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpCompProp = tmpNestedAssignObjPatternRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const obj = {};
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
obj[tmpNestedAssignObjPatternRhs];
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
const d = c.a;
a[ c ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
