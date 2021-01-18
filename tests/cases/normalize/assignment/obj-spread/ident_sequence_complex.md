# Preval test case

# ident_sequence_complex.md

> normalize > assignment > obj-spread > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$({...(a = ($(b), $(c)))});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedComplexRhs = $(c);
a = tmpNestedComplexRhs;
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjSpreadArg;
var tmpNestedComplexRhs;
let a = 1;
$(2);
tmpNestedComplexRhs = $(3);
a = tmpNestedComplexRhs;
tmpObjSpreadArg = tmpNestedComplexRhs;
tmpArg = { ...tmpObjSpreadArg };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[2], [3], [{}], [null, 2, 3], null];

Normalized calls: Same

Final output calls: Same
