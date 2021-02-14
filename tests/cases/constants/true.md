# Preval test case

# null.md

> constants > null
>
> A constant set to true should be eliminated

#TODO

## Input

`````js filename=intro
const x = true;
$(x);
`````

## Normalized

`````js filename=intro
const x = true;
$(x);
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
