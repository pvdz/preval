# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ({}) $();
`````

## Normalized

`````js filename=intro
if ({}) {
  $();
}
`````

## Output

`````js filename=intro
$();
`````

## Result

Should call `$` with:
[[], null];

Normalized calls: Same

Final output calls: Same
