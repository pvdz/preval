# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(global??foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
global = global;
tmpTernaryTest = global == null;
if (tmpTernaryTest) {
  tmpArg = foo;
} else {
  tmpArg = global;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
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
global = global;
tmpTernaryTest = global == null;
if (tmpTernaryTest) {
  tmpArg = foo;
} else {
  tmpArg = global;
}
$(tmpArg);
`````
