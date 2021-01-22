# Preval test case

# ident_sequence_simple.md

> normalize > assignment > template > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = ($(b), c)} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTemplateExpr;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
$(b);
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
var tmpTemplateExpr;
var tmpNestedComplexRhs;
let a = 1;
$(2);
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
tmpArg = `abc ${tmpTemplateExpr} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: "abc 3 def"
 - 2: 3,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
