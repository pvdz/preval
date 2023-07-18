# Preval test case

# stmt_simple_simple.md

> Logical > And > Stmt simple simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 && 2;
`````

## Pre Normal

`````js filename=intro
1 && 2;
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
