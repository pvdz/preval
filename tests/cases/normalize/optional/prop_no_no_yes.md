# Preval test case

# prop_no_no_yes.md

> normalize > optional > prop_no_no_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c?.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = {};
tmpMemberComplexObj = a.b;
tmpOptionalChaining = tmpMemberComplexObj.c;
tmpTernaryTest = tmpOptionalChaining == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpMemberComplexObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
const a = {};
tmpMemberComplexObj = a.b;
tmpOptionalChaining = tmpMemberComplexObj.c;
tmpTernaryTest = tmpOptionalChaining == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same
