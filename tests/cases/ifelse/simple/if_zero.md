# Preval test case

# if_zero.md

> ifelse > simple > if_zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $();
`````

## Normalized

`````js filename=intro
if (0) {
  $();
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
