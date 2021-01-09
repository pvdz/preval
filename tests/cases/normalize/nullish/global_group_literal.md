# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
const y = (1, 2, 3)??foo
$(y);
`````

## Normalized

`````js filename=intro
var tmpNullish;
var tmpTernaryTest;
1;
2;
tmpNullish = 3;
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
x = 8;
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
tmpNullish = 3;
tmpTernaryTest = tmpNullish == null;
let y;
if (tmpTernaryTest) {
  y = foo;
} else {
  y = tmpNullish;
}
$(y);
`````
