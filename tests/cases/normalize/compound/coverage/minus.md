# Preval test case

# minus.md

> normalize > compound > coverage > minus
>
> Compound assignments should destructure to regular assignments

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a -= b;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
a = a - b;
$(a);
`````

## Output

`````js filename=intro
$(-1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
