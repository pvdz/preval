# Preval test case

# complex_complex.md

> Normalize > Templates > Complex complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ $(20) } def`);
`````

## Pre Normal

`````js filename=intro
$(`abc ${$(10)} ${$(20)} def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = $(10);
const tmpTemplateExpr$1 = $(20);
const tmpCalleeParam = `abc ${tmpTemplateExpr} ${tmpTemplateExpr$1} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = $(10);
const tmpTemplateExpr$1 = $(20);
const tmpCalleeParam = `abc ${tmpTemplateExpr} ${tmpTemplateExpr$1} def`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
