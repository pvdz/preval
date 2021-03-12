# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Arg > Template complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${`a ${$(1)} b`}`);
`````

## Pre Normal

`````js filename=intro
$(`${`a ${$(1)} b`}`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
const tmpCalleeParam = `${tmpTemplateExpr}`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr$1 = $(1);
const tmpTemplateExpr = `a ${tmpTemplateExpr$1} b`;
const tmpCalleeParam = `${tmpTemplateExpr}`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a 1 b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
