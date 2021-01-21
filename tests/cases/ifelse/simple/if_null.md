# Preval test case

# if_null.md

> ifelse > simple > if_null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $();
`````

## Normalized

`````js filename=intro
if (null) {
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
