# Preval test case

# if_arr_empty_len.md

> ifelse > simple > if_arr_empty_len
>
> Eliminate simple tautology

#TODO

## Input

`````js filename=intro
if ([].length) $();
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = [].length;
  if (ifTestTmp) {
    $();
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = [].length;
if (ifTestTmp) {
  $();
}
`````
