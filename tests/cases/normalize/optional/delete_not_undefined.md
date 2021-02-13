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
const tmpIfTest = tmpDeleteOpt == null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
}
`````

## Output

`````js filename=intro
let o = $(undefined);
const tmpDeleteOpt = o;
const tmpIfTest = tmpDeleteOpt == null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
}
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: BAD?!
 - 1: undefined
 - eval returned: ('<crash[ Cannot convert undefined or null to object ]>')

Final output calls: BAD!!
 - 1: undefined
 - eval returned: ('<crash[ Cannot convert undefined or null to object ]>')
