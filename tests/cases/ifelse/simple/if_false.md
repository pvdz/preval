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

## Output

`````js filename=intro

`````
