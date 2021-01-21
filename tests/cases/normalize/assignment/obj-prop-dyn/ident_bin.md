# Preval test case

# ident_bin.md

> normalize > assignment > obj-prop-dyn > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$({[(a = b + c)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
tmpNestedComplexRhs = b + c;
a = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedComplexRhs;
let a = 1;
tmpNestedComplexRhs = 5;
a = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: {"5":1000}
 - 1: 5,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ 5: 1000 }], [5, 5, 3], null];

