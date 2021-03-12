# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Statement > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${/foo/g}`;
`````

## Pre Normal

`````js filename=intro
`${/foo/g}`;
`````

## Normalized

`````js filename=intro
const tmpTemplateExpr = /foo/g;
`${tmpTemplateExpr}`;
`````

## Output

`````js filename=intro
const tmpTemplateExpr = /foo/g;
`${tmpTemplateExpr}`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
