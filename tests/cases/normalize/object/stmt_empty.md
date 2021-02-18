# Preval test case

# stmt_empty.md

> normalize > object > stmt_empty
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({});
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
