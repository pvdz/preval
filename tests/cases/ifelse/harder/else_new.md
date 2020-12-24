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
tmpNewObj = $(1);
if (new tmpNewObj()) {
  $(2);
} else {
  $(3);
}
`````

## Output

`````js filename=intro
var tmpNewObj;
tmpNewObj = $(1);
new tmpNewObj();
$(2);
`````
