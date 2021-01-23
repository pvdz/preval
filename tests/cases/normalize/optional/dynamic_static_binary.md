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
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryAlternate;
var tmpTernaryTest;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpComputedObj = obj;
  tmpComputedProp = 'fo' + 'o';
  tmpTernaryAlternate = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComputedObj;
var tmpComputedProp;
var tmpTernaryAlternate;
var tmpTernaryTest;
const obj = { foo: 10 };
tmpTernaryTest = obj == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpComputedObj = obj;
  tmpComputedProp = 'foo';
  tmpTernaryAlternate = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
