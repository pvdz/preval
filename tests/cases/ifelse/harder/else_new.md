# Preval test case

# else_new.md

> ifelse > harder > else_new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($(1))) $(2);
else $(3);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
{
  tmpNewObj = $(1);
  let ifTestTmp = new tmpNewObj();
  if (ifTestTmp) {
    $(2);
  } else {
    $(3);
  }
}
`````

## Uniformed

`````js filename=intro
var x;
{
  x = x(8);
  var x = new x();
  if (x) {
    x(8);
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
var tmpNewObj;
tmpNewObj = $(1);
let ifTestTmp = new tmpNewObj();
if (ifTestTmp) {
  $(2);
} else {
  $(3);
}
`````
