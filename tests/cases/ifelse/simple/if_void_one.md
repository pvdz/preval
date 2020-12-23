# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
`````

## Normalized

`````js filename=intro
if (void 1) {
  $();
}
`````

## Output

`````js filename=intro

`````
