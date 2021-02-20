# Preval test case

# if_nan.md

> Ifelse > Simple > If nan
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
