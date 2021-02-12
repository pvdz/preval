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
const tmpIfTest = undefined;
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = undefined;
if (tmpIfTest) {
  $();
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
