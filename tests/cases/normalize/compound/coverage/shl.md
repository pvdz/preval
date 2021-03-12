# Preval test case

# shl.md

> Normalize > Compound > Coverage > Shl
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a <<= b;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2;
a <<= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a << b;
$(a);
`````

## Output

`````js filename=intro
$(4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
