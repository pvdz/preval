# Preval test case

# if_string_falsy.md

> ifelse > simple > if_string_falsy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("") {
  $();
}
`````

## Normalized

`````js filename=intro
if ('') {
  $();
}
`````

## Uniformed

`````js filename=intro
if ('str') {
  x();
}
`````

## Output

`````js filename=intro

`````
