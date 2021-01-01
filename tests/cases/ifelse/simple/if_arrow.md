# Preval test case

# if_arr.md

> ifelse > simple > if_arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $();
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = () => {};
  if (ifTestTmp) {
    $();
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = () => {};
if (ifTestTmp) {
  $();
}
`````
