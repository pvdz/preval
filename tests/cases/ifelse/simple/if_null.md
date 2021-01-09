# Preval test case

# if_null.md

> ifelse > simple > if_null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $();
`````

## Normalized

`````js filename=intro
if (null) {
  $();
}
`````

## Uniformed

`````js filename=intro
if (/regex/) {
  x();
}
`````

## Output

`````js filename=intro

`````
