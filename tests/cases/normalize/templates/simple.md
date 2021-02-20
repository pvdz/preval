# Preval test case

# simple.md

> Normalize > Templates > Simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(1) } def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpTemplateExpr = $(1);
const tmpCalleeParam = `abc ${tmpTemplateExpr} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpTemplateExpr = $(1);
const tmpCalleeParam = `abc ${tmpTemplateExpr} def`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'abc 1 def'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
