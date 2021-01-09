# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['foo']);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.foo), tmpTernaryAlternate);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.foo), tmpTernaryAlternate);
$(tmpArg);
`````
