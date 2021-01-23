# Preval test case

# prop_no_yes_no.md

> normalize > nullish > prop_no_yes_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryConsequent;
var tmpTernaryTest;
const a = {};
tmpNullish = a.b;
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
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
var tmpTernaryConsequent;
var tmpTernaryTest;
const a = {};
tmpNullish = a.b;
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpTernaryConsequent = c.d;
  tmpArg = tmpTernaryConsequent;
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
