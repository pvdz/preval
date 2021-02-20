# Preval test case

# string.md

> Normalize > Templates > Static resolve > Statement > String
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${"why"}`;
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
