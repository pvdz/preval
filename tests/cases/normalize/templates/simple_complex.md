# Preval test case

# simple_complex.md

> Normalize > Templates > Simple complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } ${ $(20) } def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = $(20);
const tmpCalleeParam = `abc 10 ${tmpTemplateExpr} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = $(20);
const tmpCalleeParam = `abc 10 ${tmpTemplateExpr} def`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - 2: 'abc 10 20 def'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
