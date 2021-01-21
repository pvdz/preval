# Preval test case

# if_undefined.md

> ifelse > simple > if_undefined
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (undefined) $();
`````

## Normalized

`````js filename=intro
if (undefined) {
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
