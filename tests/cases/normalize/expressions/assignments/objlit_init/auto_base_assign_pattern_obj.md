# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > objlit_init > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$({ x: (a = { b } = $({ b: $(2) })) });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
let tmpNestedComplexRhs;
const tmpCallCallee$1 = $;
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
b = tmpNestedAssignObjPatternRhs.b;
tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { x: '{"b":"2"}' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
