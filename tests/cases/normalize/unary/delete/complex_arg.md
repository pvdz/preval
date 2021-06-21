# Preval test case

# complex_arg.md

> Normalize > Unary > Delete > Complex arg
>
> The complex arg should not lead to a syntax error

#TODO

## Input

`````js filename=intro
const x = {y: 1};
$(x);
delete $(x);
$(x);
`````

## Pre Normal

`````js filename=intro
const x = { y: 1 };
$(x);
delete $(x);
$(x);
`````

## Normalized

`````js filename=intro
const x = { y: 1 };
$(x);
$(x);
$(x);
`````

## Output

`````js filename=intro
const x = { y: 1 };
$(x);
$(x);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { y: '1' }
 - 3: { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
