# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
`````

## Normalized

`````js filename=intro
{
  1;
  let ifTestTmp = undefined;
  if (ifTestTmp) {
    $();
  }
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
