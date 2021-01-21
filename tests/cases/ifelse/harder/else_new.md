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

## Result

Should call `$` with:
 - 0: 1
 - 1: <crash[ <ref> is not a constructor ]>

Normalized calls: Same

Final output calls: Same
