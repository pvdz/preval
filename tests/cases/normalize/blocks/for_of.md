# Preval test case

# for_of.md

> normalize > blocks > for_of
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x of $(1)) $(2);
`````

## Normalized

`````js filename=intro
for (x of $(1)) {
  $(2);
}
`````

## Output

`````js filename=intro
for (x of $(1)) {
  $(2);
}
`````
