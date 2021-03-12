# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Throw > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
throw ({ a } = $({ a: 1, b: 2 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let { a } = { a: 999, b: 1000 };
throw ({ a } = $({ a: 1, b: 2 }));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpThrowArg;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpThrowArg = tmpNestedAssignObjPatternRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
tmpNestedAssignObjPatternRhs.a;
throw tmpNestedAssignObjPatternRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
