# Preval test case

# if_class.md

> Ifelse > Simple > If class
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

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
