# Preval test case

# undefined.md

> normalize > templates > static_resolve > statement > undefined
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${undefined}`;
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
