# Preval test case

# delete_not_undefined.md

> normalize > optional > delete_not_undefined
>
> Delete on member expression is special casing. Works with optional chaining.

#TODO

## Input

`````js filename=intro
let o = $(undefined);
delete o?.x;
`````

## Normalized

`````js filename=intro
let o = $(undefined);
const tmpDeleteOpt = o;
if (tmpDeleteOpt) {
  delete tmpDeleteOpt.x;
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
