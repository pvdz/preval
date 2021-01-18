# Preval test case

# ident_simple.md

> normalize > assignment > obj-prop-dyn > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$({[(a = b)]: 1000});
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComputedKey;
let a = 1;
let b = 2;
let c = 3;
a = b;
tmpComputedKey = b;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedKey;
let a = 1;
a = 2;
tmpComputedKey = 2;
tmpArg = { [tmpComputedKey]: 1000 };
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ 2: 1000 }], [2, 2, 3], null];

Normalized calls: Same

Final output calls: Same
