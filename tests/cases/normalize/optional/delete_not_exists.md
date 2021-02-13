# Preval test case

# delete_not_exists.md

> normalize > optional > delete_not_exists
>
> Delete on member expression is special casing. Works with optional chaining.

#TODO

## Input

`````js filename=intro
let o = {};
$(o);
delete o?.x;
$(o);
`````

## Normalized

`````js filename=intro
let o = {};
$(o);
const tmpDeleteOpt = o;
if (tmpDeleteOpt) {
  delete tmpDeleteOpt.x;
}
$(o);
`````

## Output

`````js filename=intro
let o = {};
$(o);
const tmpDeleteOpt = o;
if (tmpDeleteOpt) {
  delete tmpDeleteOpt.x;
}
$(o);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same