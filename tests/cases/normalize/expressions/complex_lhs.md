# Preval test case

# complex_lhs.md

> Normalize > Expressions > Complex lhs
>
> Lhs of assignment can have side effects too

## Input

`````js filename=intro
$({}).foo = 10;
`````

## Pre Normal


`````js filename=intro
$({}).foo = 10;
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = {};
const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
const tmpAssignMemLhsObj = $(tmpCalleeParam);
tmpAssignMemLhsObj.foo = 10;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( a );
b.foo = 10;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
