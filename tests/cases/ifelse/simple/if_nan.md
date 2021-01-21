# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (NaN) $();
`````

## Normalized

`````js filename=intro
if (NaN) {
  $();
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
