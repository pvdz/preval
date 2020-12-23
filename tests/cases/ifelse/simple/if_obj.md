# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ({}) $();
`````

## Normalized

`````js filename=intro
if ({}) {
  $();
}
`````

## Output

`````js filename=intro
{
  $();
}
`````
