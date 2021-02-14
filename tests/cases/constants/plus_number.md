# Preval test case

# minus_number.md

> constants > minus_number
>
> Positive numbers should be treated as constants as well. But the minus is dropped either way so it should be easy.

#TODO

## Input

`````js filename=intro
const x = +5;
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
