# Preval test case

# member_prop.md

> normalize > nullish > member_prop
>
> nullish chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x??length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
const x = 10;
x = x;
tmpTernaryTest = x == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = x;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8;
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
var tmpArg;
var tmpTernaryTest;
const x = 10;
x = x;
tmpTernaryTest = x == null;
if (tmpTernaryTest) {
  tmpArg = length;
} else {
  tmpArg = x;
}
$(tmpArg);
`````
