# Preval test case

# prop_no_yes_yes.md

> normalize > nullish > prop_no_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const a = {};
tmpNullish$1 = a.b;
tmpTernaryTest = tmpNullish$1 == null;
if (tmpTernaryTest) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$1 = tmpNullish == null;
if (tmpTernaryTest$1) {
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
const a = {};
tmpNullish$1 = a.b;
tmpTernaryTest = tmpNullish$1 == null;
if (tmpTernaryTest) {
  tmpNullish = c;
} else {
  tmpNullish = tmpNullish$1;
}
tmpTernaryTest$1 = tmpNullish == null;
if (tmpTernaryTest$1) {
  tmpArg = d;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
