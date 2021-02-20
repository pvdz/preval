# Preval test case

# one.md

> Normalize > Templates > Static resolve > Statement > One
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${1}`;
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
