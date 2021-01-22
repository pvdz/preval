# Preval test case

# ident_simple.md

> normalize > assignment > template > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
let a = 1;
let b = 2;
let c = 3;
a = b;
tmpTemplateExpr = b;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
let a = 1;
a = 2;
tmpTemplateExpr = 2;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "abc 2 def"
 - 1: 2,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
