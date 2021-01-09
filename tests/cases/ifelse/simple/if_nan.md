# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (NaN) $();
`````

## Normalized

`````js filename=intro
if (NaN) {
  $();
}
`````

## Uniformed

`````js filename=intro
if (x) {
  x();
}
`````

## Output

`````js filename=intro

`````
