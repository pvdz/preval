# Preval test case

# minus_zero.md

> normalize > templates > static_resolve > statement > minus_zero
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${-0}`;
`````

## Normalized

`````js filename=intro
`${-0}`;
`````

## Output

`````js filename=intro
`${-0}`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
