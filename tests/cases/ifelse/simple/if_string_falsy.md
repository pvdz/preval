# Preval test case

# if_string_falsy.md

> ifelse > simple > if_string_falsy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("") {
  $();
}
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
