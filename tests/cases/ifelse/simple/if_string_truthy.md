# Preval test case

# if_string_truthy.md

> ifelse > simple > if_string_truthy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("pass") {
  $();
}
`````

## Normalized

`````js filename=intro
if ('pass') {
  $();
}
`````

## Output

`````js filename=intro
$();
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
