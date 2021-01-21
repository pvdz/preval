# Preval test case

# else_string_truthy.md

> ifelse > simple > else_string_truthy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("pass") {
  $(1);
} else {
  $(2);
}
`````

## Normalized

`````js filename=intro
if ('pass') {
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
