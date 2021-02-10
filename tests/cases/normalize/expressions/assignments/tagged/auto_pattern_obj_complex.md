# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > tagged > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$`before ${({ a } = $({ a: 1, b: 2 }))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: ['before ', ' after'], { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
