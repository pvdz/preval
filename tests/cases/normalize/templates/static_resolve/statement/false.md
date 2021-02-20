# Preval test case

# false.md

> Normalize > Templates > Static resolve > Statement > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${false}`;
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
