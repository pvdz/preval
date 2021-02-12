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
if (NaN) {
  $();
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
