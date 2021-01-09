# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())??foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
1;
2;
tmpNullish = $();
tmpTernaryTest = tmpNullish == null;
{
  let y;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
}
$(y);
`````

## Uniformed

`````js filename=intro
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
    x = x;
  }
}
x(x);
`````

## Output

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
tmpNullish = $();
tmpTernaryTest = tmpNullish == null;
let y;
if (tmpTernaryTest) {
  y = foo;
} else {
  y = tmpNullish;
}
$(y);
`````
