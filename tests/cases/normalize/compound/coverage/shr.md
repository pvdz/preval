# Preval test case

# shr.md

> normalize > compound > coverage > shr
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a >>= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a >> b;
$(a);
`````

## Output

`````js filename=intro
let a = 1;
a = a >> 2;
$(a);
`````

## Result

Should call `$` with:
[[0], null];

Normalized calls: Same

Final output calls: Same
