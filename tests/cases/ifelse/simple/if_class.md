# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $();
}
`````

## Result

Should call `$` with:
 - 0: 
 - 1: undefined

Normalized calls: Same

Final output calls: Same
