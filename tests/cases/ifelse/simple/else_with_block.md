# Preval test case

# else_with_block.md

> ifelse > simple > else_with_block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) {
  $(1);
} else {
  $(2);
}
`````

## Normalized

`````js filename=intro
if (true) {
  $(1);
} else {
  $(2);
}
`````

## Uniformed

`````js filename=intro
if (true) {
  x(8);
} else {
  x(8);
}
`````

## Output

`````js filename=intro
$(1);
`````
