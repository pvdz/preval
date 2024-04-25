# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Ternary b > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(1) ? ([b] = $([$(2)])) : $(200);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(1) ? ([b] = $([$(2)])) : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  b = arrPatternSplat[0];
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = [];
const b = $( 1 );
if (b) {
  const c = $( 2 );
  const d = [ c ];
  const e = $( d );
  const f = [ ... e ];
  a = f[ 0 ];
}
else {
  $( 200 );
}
const g = {
a: 999,
b: 1000
;
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
