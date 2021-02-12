# Preval test case

# complex_object.md

> normalize > call > complex_object
>
> Calls should have simple idents

#TODO

## Input

`````js filename=intro
$($)(1, 2);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $($);
tmpCallCallee(1, 2);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
tmpCallCallee(1, 2);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
