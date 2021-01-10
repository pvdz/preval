# Preval test case

# _base_prop_undef.md

> normalize > optional > _base_prop_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f?.x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f.x;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = x;
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
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = undefined;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f.x;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````
