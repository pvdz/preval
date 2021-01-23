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
  tmpComputedProp = $();
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
  tmpComputedProp = $();
  tmpTernaryAlternate = tmpComputedObj[tmpComputedProp];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
