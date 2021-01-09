# Preval test case

# if_zero.md

> ifelse > simple > if_zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $();
`````

## Normalized

`````js filename=intro
if (0) {
  $();
}
`````

## Uniformed

`````js filename=intro
if (8) {
  x();
}
`````

## Output

`````js filename=intro

`````
