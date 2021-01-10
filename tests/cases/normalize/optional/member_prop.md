# Preval test case

# member_prop.md

> normalize > optional > member_prop
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
const x = 10;
tmpTernaryTest = x == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = x.length;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = 8;
x = x * x;
if (x) {
  x = x;
} else {
  x = x.x;
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpTernaryTest = false;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = (10).length;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````
