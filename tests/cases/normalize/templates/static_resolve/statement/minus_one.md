# Preval test case

# minus_one.md

> normalize > templates > static_resolve > statement > minus_one
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${-1}`;
`````

## Normalized

`````js filename=intro
`${-1}`;
`````

## Output

`````js filename=intro
`${-1}`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
