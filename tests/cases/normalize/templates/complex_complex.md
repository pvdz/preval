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
var tmpArg;
var tmpTemplateExpr;
var tmpTemplateExpr$1;
tmpTemplateExpr = $(10);
tmpTemplateExpr$1 = $(20);
tmpArg = `abc ${tmpTemplateExpr} ${tmpTemplateExpr$1} def`;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpTemplateExpr$1;
tmpTemplateExpr = $(10);
tmpTemplateExpr$1 = $(20);
tmpArg = `abc ${tmpTemplateExpr} ${tmpTemplateExpr$1} def`;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: 20
 - 2: "abc 10 20 def"
 - 3: undefined

Normalized calls: Same

Final output calls: Same
