# Preval test case

# ident_sequence_complex.md

> normalize > assignment > arr-spread > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$([...(a = ($(b), $(c)))]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
$(b);
tmpNestedComplexRhs = $(c);
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
var tmpNestedComplexRhs;
let a = 1;
$(2);
tmpNestedComplexRhs = $(3);
a = tmpNestedComplexRhs;
tmpElement = tmpNestedComplexRhs;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same