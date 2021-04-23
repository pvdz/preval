# Preval test case

# _base_prop_obj.md

> Normalize > Nullish > Base prop obj
>
> Simple example

#TODO

## Input

`````js filename=intro
var f = {x: 10};
$(f??x);
`````

## Pre Normal

`````js filename=intro
let f = undefined;
f = { x: 10 };
$(f ?? x);
`````

## Normalized

`````js filename=intro
let f = undefined;
f = { x: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = f;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = x;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = { x: 10 };
let tmpCalleeParam = f;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = x;
} else {
}
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
