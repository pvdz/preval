# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Compound > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
a.b = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
a.b = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const a = { a: 999, b: 1000 };
const tmpBinBothRhs = { b: tmpObjLitVal };
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
const tmpAssignMemRhs = $(2);
tmpClusterSSA_a.b = tmpAssignMemRhs;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
const c = { b: a };
const d = b * c;
$( d );
const e = $( 2 );
d.b = e;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: 2
 - eval returned: ("<crash[ Cannot create property 'b' on number 'NaN' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
