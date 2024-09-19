# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic or right > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(100) || ([b] = $([$(2)]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(100) || ([b] = $([$(2)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const b /*:array*/ = [];
  $(a, b);
} else {
  const tmpArrElement = $(2);
  const tmpCalleeParam /*:array*/ = [tmpArrElement];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat /*:array*/ = [...arrAssignPatternRhs];
  const tmpClusterSSA_b = arrPatternSplat[0];
  $(a, tmpClusterSSA_b);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = [];
  $( b, c );
}
else {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ...f ];
  const h = g[ 0 ];
  $( b, h );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
