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

## Uniformed

`````js filename=intro
{
  var x = () => {};
  if (x) {
    x();
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
