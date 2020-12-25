# Preval test case

# while.md

> normalize > blocks > while
>
> Add blocks to sub-statements

#TODO

## Input

`````js filename=intro
while ($(1)) $(2);
`````

## Normalized

`````js filename=intro
while ($(1)) {
  $(2);
}
`````

## Output

`````js filename=intro
while ($(1)) {
  $(2);
}
`````