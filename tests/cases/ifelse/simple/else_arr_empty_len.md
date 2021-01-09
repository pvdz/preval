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
{
  let ifTestTmp = [].length;
  if (ifTestTmp) {
    $(1);
  } else {
    $(2);
  }
}
`````

## Uniformed

`````js filename=intro
{
  var x = [].x;
  if (x) {
    x(8);
  } else {
    x(8);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = [].length;
if (ifTestTmp) {
  $(1);
} else {
  $(2);
}
`````
