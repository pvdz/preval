# Preval test case

# if_true.md

> ifelse > simple > if_true
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) $();
`````

## Normalized

`````js filename=intro
if (true) {
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
