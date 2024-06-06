# Preval test case

# stmt_simple.md

> Normalize > Array > Stmt simple
>
> Array statements should be eliminated

#TODO

## Input

`````js filename=intro
const a = $(1);
[a, 2, 3];
`````

## Pre Normal


`````js filename=intro
const a = $(1);
[a, 2, 3];
`````

## Normalized


`````js filename=intro
const a = $(1);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
