# Preval test case

# _base_prop_obj.md

> normalize > optional > _base_prop_obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {x: 10};
$(f?.x);
`````

## Normalized

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { x: 10 };
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f.x;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
var f;
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
f = { x: 10 };
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f.x;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
