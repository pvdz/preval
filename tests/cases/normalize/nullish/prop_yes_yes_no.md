# Preval test case

# prop_yes_yes_no.md

> normalize > nullish > prop_yes_yes_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish = b;
} else {
  tmpNullish = a;
}
tmpTernaryTest$1 = tmpNullish == null;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent = c.d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish = b;
} else {
  tmpNullish = a;
}
tmpTernaryTest$1 = tmpNullish == null;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent = c.d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: undefined

Normalized calls: BAD?!
['<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
['<crash[ Assignment to constant variable. ]>'];

