# Preval test case

# if_obj.md

> ifelse > simple > if_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = function () {};
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = function () {};
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
