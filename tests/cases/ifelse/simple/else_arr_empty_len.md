# Preval test case

# else_arr_empty_len.md

> ifelse > simple > else_arr_empty_len
>
> Eliminate simple tautology

#TODO

## Input

`````js filename=intro
if ([].length) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
var tmpObj;
tmpObj = [];
if (tmpObj.length) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
var tmpObj;
tmpObj = [];
if (tmpObj.length) {
  $(1);
} else {
  $(2);
}
`````
