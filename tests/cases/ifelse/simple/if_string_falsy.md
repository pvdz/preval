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
if ('') {
  $();
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
