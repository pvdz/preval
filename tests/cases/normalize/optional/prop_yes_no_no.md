# Preval test case

# prop_yes_no_no.md

> normalize > optional > prop_yes_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.b.c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
var tmpTernaryTest$2;
var tmpTernaryAlternate$2;
const a = {};
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining$1 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1.c;
  tmpOptionalChaining = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining == null;
if (tmpTernaryTest$2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$2;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining$1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest$1;
var tmpTernaryAlternate$1;
var tmpTernaryTest$2;
var tmpTernaryAlternate$2;
const a = {};
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpOptionalChaining$1 = undefined;
} else {
  tmpTernaryAlternate = a.b;
  tmpOptionalChaining$1 = tmpTernaryAlternate;
}
tmpTernaryTest$1 = tmpOptionalChaining$1 == null;
if (tmpTernaryTest$1) {
  tmpOptionalChaining = undefined;
} else {
  tmpTernaryAlternate$1 = tmpOptionalChaining$1.c;
  tmpOptionalChaining = tmpTernaryAlternate$1;
}
tmpTernaryTest$2 = tmpOptionalChaining == null;
if (tmpTernaryTest$2) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate$2 = tmpOptionalChaining.d;
  tmpArg = tmpTernaryAlternate$2;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'c' of undefined ]>

Normalized calls: BAD?!
[[null], null];

Final output calls: BAD!!
[[null], null];

