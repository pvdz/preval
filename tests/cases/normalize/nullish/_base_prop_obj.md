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

## Normalized

`````js filename=intro
var f;
f = { x: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = f;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = x;
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

Normalized calls: Same

Final output calls: Same
