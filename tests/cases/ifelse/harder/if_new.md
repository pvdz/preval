# Preval test case

# if_new.md

> ifelse > harder > if_new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($(1))) $(2);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
tmpNewObj = $(1);
const tmpIfTest = new tmpNewObj();
if (tmpIfTest) {
  $(2);
}
`````

## Output

`````js filename=intro
var tmpNewObj;
tmpNewObj = $(1);
const tmpIfTest = new tmpNewObj();
if (tmpIfTest) {
  $(2);
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: <crash[ <ref> is not a constructor ]>

Normalized calls: Same

Final output calls: Same
