# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic and right > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(100) && ([b] = $([$(2)]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(100) && ([b] = $([$(2)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
} else {
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = [];
const b = $( 100 );
const c = {
a: 999,
b: 1000
;
if (b) {
  const d = $( 2 );
  const e = [ d ];
  const f = $( e );
  const g = [ ... f ];
  a = g[ 0 ];
  $( c, a );
}
else {
  $( c, a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
