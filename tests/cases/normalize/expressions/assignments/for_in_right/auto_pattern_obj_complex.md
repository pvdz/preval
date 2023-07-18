# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > For in right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (let x in ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
for (let x in ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpForInDeclRhs = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpForInDeclRhs = tmpNestedAssignObjPatternRhs;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
let x = undefined;
for (x in tmpNestedAssignObjPatternRhs) {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 1,
b: 2
;
const b = $( a );
const c = b.a;
let d = undefined;
for (d in b {

}
$( c );
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
