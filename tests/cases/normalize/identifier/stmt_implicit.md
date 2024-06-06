# Preval test case

# stmt_implicit.md

> Normalize > Identifier > Stmt implicit
>
> Implicit global statement should not be eliminated

#TODO

## Input

`````js filename=intro
foo;
`````

## Pre Normal


`````js filename=intro
foo;
`````

## Normalized


`````js filename=intro
foo;
`````

## Output


`````js filename=intro
foo;
`````

## PST Output

With rename=true

`````js filename=intro
foo;
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
