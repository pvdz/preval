# Preval test case

# _base_prop_undef.md

> normalize > nullish > _base_prop_undef
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = undefined;
$(f??x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
f = undefined;
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
f = undefined;
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
[[null], null];

Normalized calls: Same

Final output calls: Same
