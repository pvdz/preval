# Preval test case

# complex_complex.md

> normalize > templates > complex_complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ $(20) } def`);
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

Normalized calls: Same

Final output calls: Same
