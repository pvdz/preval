# Preval test case

# else_one.md

> ifelse > simple > else_one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (1) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (1) {
  $(1);
} else {
  $(2);
}
`````

## Uniformed

`````js filename=intro
if (8) {
  x(8);
} else {
  x(8);
}
`````

## Output

`````js filename=intro
$(1);
`````
