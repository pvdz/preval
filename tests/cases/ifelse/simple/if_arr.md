# Preval test case

# if_arr.md

> ifelse > simple > if_arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([]) $();
`````

## Normalized

`````js filename=intro
if ([]) {
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
