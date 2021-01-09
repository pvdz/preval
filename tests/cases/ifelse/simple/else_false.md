# Preval test case

# else_false.md

> ifelse > simple > else_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (false) {
  $(1);
} else {
  $(2);
}
`````

## Uniformed

`````js filename=intro
if (false) {
  x(8);
} else {
  x(8);
}
`````

## Output

`````js filename=intro
$(2);
`````
