# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Switch default > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    [b] = $([$(2)]);
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    [b] = $([$(2)]);
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCallCallee = $;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
const tmpSSA_b = arrPatternSplat[0];
$(a, tmpSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
$( 1 );
const b = $( 2 );
const c = [ b,, ];
const d = $( c );
const e = [ ... d,, ];
const f = e[ 0 ];
$( a, f );
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
