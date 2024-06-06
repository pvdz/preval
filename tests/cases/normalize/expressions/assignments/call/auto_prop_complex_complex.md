# Preval test case

# auto_prop_complex_complex.md

> Normalize > Expressions > Assignments > Call > Auto prop complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }));
$(a).b = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }));
$(a).b = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
$(a);
const tmpAssignMemLhsObj = $(a);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( b );
const d = $( 2 );
c.b = d;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
