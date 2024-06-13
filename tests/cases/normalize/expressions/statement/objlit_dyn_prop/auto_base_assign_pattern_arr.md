# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Objlit dyn prop > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
({ [([b] = $([$(2)]))]: 10 });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
({ [([b] = $([$(2)]))]: 10 });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
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
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...arrAssignPatternRhs];
const tmpClusterSSA_b = arrPatternSplat[0];
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $( 2 );
const c = [ b ];
const d = $( c );
const e = [ ... d ];
const f = e[ 0 ];
$( a, f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
