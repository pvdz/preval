# Preval test case

# if_null.md

> ifelse > simple > if_null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = null;
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = null;
if (tmpIfTest) {
  $();
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
