# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(100) || ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$($(100) || ({ a: a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = 999;
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  $(tmpNestedAssignObjPatternRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 999;
const b = $( 100 );
if (b) {
  $( b );
}
else {
  const c = {
    a: 1,
    b: 2,
  };
  const d = $( c );
  a = d.a;
  $( d );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
