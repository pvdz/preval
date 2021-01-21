# Preval test case

# member_computed.md

> normalize > optional > member_computed
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
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
  tmpTernaryAlternate = x[20];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
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
  tmpTernaryAlternate = (10)[20];
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
