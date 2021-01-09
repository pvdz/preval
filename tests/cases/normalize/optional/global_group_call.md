# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())?.foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
1;
2;
tmpOptionalChaining = $();
tmpTernaryTest = tmpOptionalChaining == null;
{
  let y;
  if (tmpTernaryTest) {
    y = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
    y = tmpTernaryAlternate;
  }
}
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
8;
8;
x = x();
x = x * x;
{
  var x;
  if (x) {
    x = x;
  } else {
    x = x.x;
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var tmpOptionalChaining;
var tmpTernaryTest;
var tmpTernaryAlternate;
tmpOptionalChaining = $();
tmpTernaryTest = tmpOptionalChaining == null;
let y;
if (tmpTernaryTest) {
  y = undefined;
} else {
  tmpTernaryAlternate = tmpOptionalChaining.foo;
  y = tmpTernaryAlternate;
}
$(y);
`````
