# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
const a = 10,
      b = (a, $(2))??toString,
      c = (1, b)??length
$(c);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
var tmpNullish_1;
var tmpTernaryTest_1;
const a = 10;
a;
tmpNullish = $(2);
tmpTernaryTest = tmpNullish == null;
const b = tmpTernaryTest ? toString : tmpNullish;
1;
tmpNullish_1 = b;
tmpTernaryTest_1 = tmpNullish_1 == null;
const c = tmpTernaryTest_1 ? length : tmpNullish_1;
$(c);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = 8;
x;
x = x(8);
x = x * x;
var x = x ? x : x;
8;
x = x;
x = x * x;
var x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
var tmpNullish_1;
var tmpTernaryTest_1;
tmpNullish = $(2);
tmpTernaryTest = tmpNullish == null;
const b = tmpTernaryTest ? toString : tmpNullish;
tmpNullish_1 = b;
tmpTernaryTest_1 = tmpNullish_1 == null;
const c = tmpTernaryTest_1 ? length : tmpNullish_1;
$(c);
`````
