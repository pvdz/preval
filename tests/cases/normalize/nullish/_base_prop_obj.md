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

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
