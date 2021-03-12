# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Arg > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${/foo/g}`);
`````

## Pre Normal

`````js filename=intro
$(`${/foo/g}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = /foo/g;
const tmpCalleeParam = `${tmpTemplateExpr}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = /foo/g;
const tmpCalleeParam = `${tmpTemplateExpr}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
