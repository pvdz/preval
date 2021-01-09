# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
const y = (1, 2, 3)?.foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
1;
2;
tmpOptionalChaining = 3;
tmpTernaryTest = tmpOptionalChaining == null;
const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.foo), tmpTernaryAlternate);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
8;
8;
x = 8;
x = x * x;
var x = x ? x : ((x = x.x), x);
x(x);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpOptionalChaining = 3;
tmpTernaryTest = tmpOptionalChaining == null;
const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.foo), tmpTernaryAlternate);
$(y);
`````
