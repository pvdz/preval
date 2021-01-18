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

## Result

Should call `$` with:
[[10], null];

Normalized calls: BAD?!
['<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
['<crash[ Assignment to constant variable. ]>'];

