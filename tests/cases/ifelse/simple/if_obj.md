# Preval test case

# if_obj.md

> Ifelse > Simple > If obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ({}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = {};
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = {};
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
