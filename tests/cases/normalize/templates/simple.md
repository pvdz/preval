# Preval test case

# simple.md

> normalize > templates > simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(1) } def`);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
tmpTemplateExpr = $(1);
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
tmpTemplateExpr = $(1);
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: "abc 1 def"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
