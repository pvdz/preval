# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
$(a)["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
$(a)[`b`] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothLhs = a;
const tmpObjLitVal$1 = $(1);
a = { b: tmpObjLitVal$1 };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
let a = { b: tmpObjLitVal };
const tmpBinBothLhs = a;
const tmpObjLitVal$1 = $(1);
a = { b: tmpObjLitVal$1 };
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = { b: a };
const c = b;
const d = $( 1 );
b = { b: d };
const e = c + b;
$( e );
const f = $( b );
f.b = 2;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: { b: '1' }
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
