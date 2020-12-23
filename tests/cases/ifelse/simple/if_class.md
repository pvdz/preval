# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $();
`````

## Normalized

`````js filename=intro
if (class {}) {
  $();
}
`````

## Output

`````js filename=intro
$();
`````
