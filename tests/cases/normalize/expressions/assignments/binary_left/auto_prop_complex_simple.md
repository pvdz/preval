# Preval test case

# auto_prop_complex_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto prop complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + $(100));
$(a).b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + $(100));
$(a).b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
const tmpAssignMemLhsObj /*:unknown*/ = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 100 );
const c = { b: a };
const d = c + b;
$( d );
const e = $( c );
e.b = 2;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: '[object Object]100'
 - 4: { b: '1' }
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
