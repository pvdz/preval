# Preval test case

# else_arr.md

> ifelse > else_arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([]) $(1);
else ;
`````

## Normalized

`````js filename=intro
if ([]) {
  $(1);
}
`````

## Uniformed

`````js filename=intro
if ([]) {
  x(8);
}
`````

## Output

`````js filename=intro
$(1);
`````
