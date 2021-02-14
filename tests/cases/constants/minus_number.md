# Preval test case

# minus_number.md

> constants > minus_number
>
> Negative numbers should be treated as constants as well

#TODO

## Input

`````js filename=intro
const x = -5;
const y = x;
$(y); // Should be inlined to -5
`````

## Normalized

`````js filename=intro
const x = -5;
const y = x;
$(y);
`````

## Output

`````js filename=intro
$(-5);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
