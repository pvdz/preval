# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Stmt global block > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let b = [];

  let a = { a: 999, b: 1000 };
  a = [b] = $([$(2)]);
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = [];
  let a = { a: 999, b: 1000 };
  a = [b] = $([$(2)]);
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
