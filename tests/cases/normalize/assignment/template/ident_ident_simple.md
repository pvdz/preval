# Preval test case

# ident_ident_simple.md

> normalize > assignment > template > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = b = c} def`);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpTemplateExpr;
let a = 1;
let b = 2;
let c = 3;
b = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpTemplateExpr;
let a = 1;
let b = 2;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "abc 3 def"
 - 1: 3,3,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
