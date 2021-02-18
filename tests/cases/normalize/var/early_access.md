# Preval test case

# early_access.md

> normalize > var > early_access
>
> Actual early access case

#TODO

## Input

`````js filename=intro
$(x); // We shouldn't break this being undefined
var x = 10; 
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
x = 10;
$(x);
`````

## Output

`````js filename=intro
var x;
$(x);
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
