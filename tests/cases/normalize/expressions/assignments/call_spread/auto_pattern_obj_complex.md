# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(...({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(...({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpCallCallee$1 = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParamSpread = tmpNestedAssignObjPatternRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpSSA_a = tmpNestedAssignObjPatternRhs.a;
$(...tmpNestedAssignObjPatternRhs);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
