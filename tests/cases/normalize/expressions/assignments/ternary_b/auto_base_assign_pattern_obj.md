# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Ternary b > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$($(1) ? (a = { b } = $({ b: $(2) })) : $(200));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
$($(1) ? (a = { b: b } = $({ b: $(2) })) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpCallCallee$1 = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam$1 = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  $(tmpNestedAssignObjPatternRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
let b = {
a: 999,
b: 1000
;
const c = $( 1 );
if (c) {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  a = f.b;
  b = f;
  $( f );
}
else {
  const g = $( 200 );
  $( g );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { b: '2' }
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
