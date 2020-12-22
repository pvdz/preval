# Preval test case

# function.md

> exprstmt > function
>
> Unused functions without side-effects can be eliminated. Okay it's not an expression. You got me.

## Input

`````js filename=intro
function f() {
  $();
}
`````

## Normalized

`````js filename=intro
function f() {
  $();
}
`````

## Output

`````js filename=intro

`````
