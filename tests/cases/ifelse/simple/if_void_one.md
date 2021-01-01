# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = void 1;
  if (ifTestTmp) {
    $();
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = void 1;
if (ifTestTmp) {
  $();
}
`````
