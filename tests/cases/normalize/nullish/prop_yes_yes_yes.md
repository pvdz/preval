# Preval test case

# prop_yes_yes_yes.md

> normalize > nullish > prop_yes_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish$1 = b;
} else {
  tmpNullish$1 = a;
}
tmpTernaryTest$1 = tmpNullish$1 == null;
if (tmpTernaryTest$1) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$2 = tmpNullish == null;
if (tmpTernaryTest$2) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
var tmpTernaryTest$2;
const a = {};
a = a;
tmpTernaryTest = a == null;
if (tmpTernaryTest) {
  tmpNullish$1 = b;
} else {
  tmpNullish$1 = a;
}
tmpTernaryTest$1 = tmpNullish$1 == null;
if (tmpTernaryTest$1) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$2 = tmpNullish == null;
if (tmpTernaryTest$2) {
  tmpArg = d;
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

