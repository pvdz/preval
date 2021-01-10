# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)??foo);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
tmpNullish = parseInt(15);
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpArg = foo;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = x(8);
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
var tmpNullish;
var tmpTernaryTest;
tmpNullish = parseInt(15);
tmpTernaryTest = tmpNullish == null;
if (tmpTernaryTest) {
  tmpArg = foo;
} else {
  tmpArg = tmpNullish;
}
$(tmpArg);
`````
