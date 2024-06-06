# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(({ a } = $({ a: 1, b: 2 })) && ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$(({ a: a } = $({ a: 1, b: 2 })) && ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
a = tmpNestedAssignObjPatternRhs.a;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
if (tmpCalleeParam) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
  a = tmpNestedAssignObjPatternRhs$1.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
let tmpClusterSSA_a = tmpNestedAssignObjPatternRhs.a;
if (tmpNestedAssignObjPatternRhs) {
  const tmpCalleeParam$3 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$3);
  tmpClusterSSA_a = tmpNestedAssignObjPatternRhs$1.a;
  $(tmpNestedAssignObjPatternRhs$1);
} else {
  $(tmpNestedAssignObjPatternRhs);
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
let c = b.a;
if (b) {
  const d = {
a: 1,
b: 2
  ;
  const e = $( d );
  c = e.a;
  $( e );
}
else {
  $( b );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
