# Preval test case

# xor.md

> normalize > compound > coverage > xor
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a ^= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a ^ b;
$(a);
`````

## Output

`````js filename=intro
let a = 1;
a = a ^ 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
