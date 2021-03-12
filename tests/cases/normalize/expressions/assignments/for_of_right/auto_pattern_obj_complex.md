# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > For of right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (let x of ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (let x of ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpForOfDeclRhs;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpForOfDeclRhs = tmpNestedAssignObjPatternRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_a = tmpNestedAssignObjPatternRhs.a;
let x;
for (x of tmpNestedAssignObjPatternRhs) {
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
