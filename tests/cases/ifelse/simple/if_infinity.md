# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (Infinity) $();
`````

## Normalized

`````js filename=intro
if (Infinity) {
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
$();
`````
