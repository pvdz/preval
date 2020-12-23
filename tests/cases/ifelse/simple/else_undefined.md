# Preval test case

# else_undefined.md

> ifelse > simple > else_undefined
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (undefined) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (undefined) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
{
  $(2);
}
`````
