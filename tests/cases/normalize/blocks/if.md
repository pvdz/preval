# Preval test case

# if.md

> normalize > blocks > if
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
`````

## Normalized

`````js filename=intro
if ($(1)) {
  $(2);
}
`````

## Output

`````js filename=intro
if ($(1)) {
  $(2);
}
`````
