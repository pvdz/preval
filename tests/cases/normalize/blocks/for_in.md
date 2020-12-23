# Preval test case

# for_in.md

> normalize > blocks > for_in
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x in $(1)) $(2);
`````

## Normalized

`````js filename=intro
for (x in $(1)) {
  $(2);
}
`````

## Output

`````js filename=intro
for (x in $(1)) {
  $(2);
}
`````
