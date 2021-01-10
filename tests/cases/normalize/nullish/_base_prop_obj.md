# Preval test case

# _base_prop_obj.md

> normalize > nullish > _base_prop_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {x: 10};
$(f??x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
f = { x: 10 };
f = f;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = x;
} else {
  tmpArg = f;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = { x: 8 };
x = x;
x = x * x;
if (x) {
  x = x;
} else {
  x = x;
}
x(x);
`````

## Output

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
f = { x: 10 };
f = f;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = x;
} else {
  tmpArg = f;
}
$(tmpArg);
`````
