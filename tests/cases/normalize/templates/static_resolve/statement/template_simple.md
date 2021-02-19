# Preval test case

# template_simple.md

> normalize > templates > static_resolve > statement > template_simple
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${`I am a string`}`;
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
