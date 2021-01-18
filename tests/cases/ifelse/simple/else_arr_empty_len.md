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

## Output

`````js filename=intro
let ifTestTmp = [].length;
if (ifTestTmp) {
  $(1);
} else {
  $(2);
}
`````

## Result

Should call `$` with:
[[2], null];

Normalized calls: Same

Final output calls: Same
