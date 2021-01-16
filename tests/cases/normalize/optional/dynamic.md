# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.[$()]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpComputedProp;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpComputedProp = $();
  tmpTernaryAlternate = obj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate;
}
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
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpComputedProp = $();
  tmpTernaryAlternate = obj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````
