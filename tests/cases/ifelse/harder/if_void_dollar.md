# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

This should reduce into $(1)

## Input

`````js filename=intro
if (void $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  let ifTestTmp = void $(1);
  if (ifTestTmp) {
    $(2);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = void $(1);
if (ifTestTmp) {
  $(2);
}
`````
