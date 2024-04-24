# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch (({ a } = $({ a: 1, b: 2 }))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = ({ a: a } = $({ a: 1, b: 2 }));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpSwitchDisc = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpSwitchDisc = tmpNestedAssignObjPatternRhs;
$(100);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpSSA_a = tmpNestedAssignObjPatternRhs.a;
$(100);
$(tmpSSA_a);
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
$( 100 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
