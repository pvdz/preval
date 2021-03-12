# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Let > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let xyz = ({ a } = $({ a: 1, b: 2 }));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
let xyz;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
xyz = tmpNestedAssignObjPatternRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
$tdz$__pattern_after_default.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_a = tmpNestedAssignObjPatternRhs.a;
$(tmpNestedAssignObjPatternRhs);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
