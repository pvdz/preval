# Preval test case

# ident_sequence_simple.md

> normalize > assignment > tagged > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$`abc ${a = ($(b), c)} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
$(b);
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
let a = 1;
tmpArg = ['abc ', ' def'];
$(2);
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````
