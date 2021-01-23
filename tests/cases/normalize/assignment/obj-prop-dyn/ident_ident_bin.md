# Preval test case

# ident_ident_bin.md

> normalize > assignment > obj-prop-dyn > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$({[(a = b = c + d)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs$1 = c + d;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
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
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpNestedComplexRhs$1 = 7;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpComputedKey = tmpNestedComplexRhs;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"7":1000}
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ 7: 1000 }], [7, 7, 7], null];

