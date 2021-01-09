# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $();
`````

## Normalized

`````js filename=intro
if (false) {
  $();
}
`````

## Uniformed

`````js filename=intro
if (false) {
  x();
}
`````

## Output

`````js filename=intro

`````
