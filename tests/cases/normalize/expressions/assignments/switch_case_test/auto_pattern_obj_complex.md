# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Switch case test > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  case ({ a } = $({ a: 1, b: 2 })):
}
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === ({ a: a } = $({ a: 1, b: 2 }))) {
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
let tmpBinBothRhs = undefined;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpBinBothRhs = tmpNestedAssignObjPatternRhs;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
$(1);
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = {
a: 1,
b: 2
;
const b = $( a );
const c = b.a;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
