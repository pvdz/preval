# Preval test case

# else_null.md

> ifelse > simple > else_null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (null) {
  $(1);
} else {
  $(2);
}
`````

## Uniformed

`````js filename=intro
if (/regex/) {
  x(8);
} else {
  x(8);
}
`````

## Output

`````js filename=intro
$(2);
`````
