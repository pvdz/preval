# Preval test case

# ident_sequence_complex.md

> normalize > assignment > binary-both > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$((a = ($(b), $(c))) + (a = ($(b), $(c))));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedComplexRhs = $(c);
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(b);
tmpNestedComplexRhs$1 = $(c);
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
$(2);
tmpNestedComplexRhs = $(3);
a = tmpNestedComplexRhs;
tmpBinaryLeft = tmpNestedComplexRhs;
$(2);
tmpNestedComplexRhs$1 = $(3);
a = tmpNestedComplexRhs$1;
tmpBinaryRight = tmpNestedComplexRhs$1;
tmpArg = tmpBinaryLeft + tmpBinaryRight;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: 2
 - 3: 3
 - 4: 6
 - 5: 3,2,3
 - 6: undefined

Normalized calls: Same

Final output calls: Same
