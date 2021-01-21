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

## Output

`````js filename=intro
$(1);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
