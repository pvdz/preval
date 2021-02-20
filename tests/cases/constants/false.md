# Preval test case

# false.md

> Constants > False
>
> A constant set to false should be eliminated

#TODO

## Input

`````js filename=intro
const x = false;
$(x);
`````

## Normalized

`````js filename=intro
const x = false;
$(x);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
