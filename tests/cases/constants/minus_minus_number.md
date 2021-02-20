# Preval test case

# minus_minus_number.md

> Constants > Minus minus number
>
> Double negative is positive. On a number that should have no observable side effects.

#TODO

## Input

`````js filename=intro
const x = -(-(5));
const y = x;
$(y); // Should be inlined to -5
`````

## Normalized

`````js filename=intro
const x = 5;
const y = x;
$(y);
`````

## Output

`````js filename=intro
$(5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
