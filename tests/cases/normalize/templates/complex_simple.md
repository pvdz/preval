# Preval test case

# complex_simple.md

> Normalize > Templates > Complex simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ 20 } def`);
`````

## Pre Normal

`````js filename=intro
$(`abc ${$(10)} ${20} def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = $(10);
const tmpCalleeParam = `abc ${tmpTemplateExpr} 20 def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = $(10);
const tmpCalleeParam = `abc ${tmpTemplateExpr} 20 def`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
