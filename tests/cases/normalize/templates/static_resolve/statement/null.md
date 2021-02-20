# Preval test case

# null.md

> Normalize > Templates > Static resolve > Statement > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${null}`;
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
