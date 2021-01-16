# Preval test case

# _base_computed_obj.md

> normalize > optional > _base_computed_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {10: 20};
var x = 10;
$(f?.[x]);
`````

## Normalized

`````js filename=intro
var f;
var x;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { 10: 20 };
x = 10;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f[x];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var f;
var x;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { 10: 20 };
x = 10;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f[x];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````
