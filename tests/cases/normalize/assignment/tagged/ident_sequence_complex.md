# Preval test case

# ident_sequence_complex.md

> normalize > assignment > tagged > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$`abc ${a = ($(b), $(c))} def`
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
tmpNestedComplexRhs = $(c);
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
tmpNestedComplexRhs = $(3);
a = tmpNestedComplexRhs;
tmpArg_1 = tmpNestedComplexRhs;
$(tmpArg, tmpArg_1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: ["abc "," def"],null
 - 3: null,2,3
 - 4: undefined

Normalized calls: Same

Final output calls: Same