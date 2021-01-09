# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['fo' + 'o']);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpComputedProp;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpComputedProp = 'fo' + 'o'), (tmpTernaryAlternate = obj[tmpComputedProp]), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpComputedProp;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpComputedProp = 'foo'), (tmpTernaryAlternate = obj[tmpComputedProp]), tmpTernaryAlternate);
$(tmpArg);
`````
