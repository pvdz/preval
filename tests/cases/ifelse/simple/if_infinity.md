# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (Infinity) $();
`````

## Normalized

`````js filename=intro
if (Infinity) {
  $();
}
`````

## Output

`````js filename=intro
{
  $();
}
`````
