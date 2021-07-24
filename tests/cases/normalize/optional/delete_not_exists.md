# Preval test case

# delete_not_exists.md

> Normalize > Optional > Delete not exists
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

## Pre Normal

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
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
} else {
}
$(o);
`````

## Output

`````js filename=intro
const o = {};
$(o);
delete o.x;
$(o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
