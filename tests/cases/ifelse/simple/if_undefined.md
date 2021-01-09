# Preval test case

# if_undefined.md

> ifelse > simple > if_undefined
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (undefined) $();
`````

## Normalized

`````js filename=intro
if (undefined) {
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
