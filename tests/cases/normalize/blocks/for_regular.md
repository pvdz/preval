# Preval test case

# for_regular.md

> normalize > blocks > for_regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````

## Normalized

`````js filename=intro
for ($(1); $(2); $(3)) {
  $(4);
}
`````

## Uniformed

`````js filename=intro
for (x(8); x(8); x(8)) {
  x(8);
}
`````

## Output

`````js filename=intro
for ($(1); $(2); $(3)) {
  $(4);
}
`````
