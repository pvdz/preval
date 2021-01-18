# Preval test case

# div.md

> normalize > compound > coverage > div
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a /= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a / b;
$(a);
`````

## Output

`````js filename=intro
let a = 1;
a = a / 2;
$(a);
`````

## Result

Should call `$` with:
[[0.5], null];

Normalized calls: Same

Final output calls: Same
