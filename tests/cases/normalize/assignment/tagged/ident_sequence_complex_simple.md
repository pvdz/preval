# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$`abc ${a = ($(b), $(c)).x = c} def`;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedComplexRhs;
var tmpNestedAssignObj;
let a = 1;
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
$(b);
tmpNestedAssignObj = $(c);
tmpNestedAssignObj.x = c;
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
var tmpNestedAssignObj;
let a = 1;
tmpArg = ['abc ', ' def'];
$(2);
tmpNestedAssignObj = $(3);
tmpNestedAssignObj.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: ["abc "," def"],3
 - 3: 3,2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same
