# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > objlit_init > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ x: ({ a } = $({ a: 1, b: 2 })) });
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpObjLitVal;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpObjLitVal = tmpNestedAssignObjPatternRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpObjLitVal;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpObjLitVal = tmpNestedAssignObjPatternRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { x: '{"a":"1","b":"2"}' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same