# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Stmt func top > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = [];

  let a = { a: 999, b: 1000 };
  a = [b] = $([$(2)]);
  $(a, b);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = [];
  let a = { a: 999, b: 1000 };
  a = [b] = $([$(2)]);
  $(a, b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = [];
  let a = { a: 999, b: 1000 };
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  $(a, b);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( c, e );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope