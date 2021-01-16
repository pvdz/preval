# Preval test case

# member_computed.md

> normalize > nullish > member_computed
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??[20]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
const x = 10;
x = x;
tmpTernaryTest = x == null;
if (tmpTernaryTest) {
  tmpTernaryConsequent = [20];
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = x;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
const x = 10;
x = x;
tmpTernaryTest = x == null;
if (tmpTernaryTest) {
  tmpTernaryConsequent = [20];
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = x;
}
$(tmpArg);
`````
