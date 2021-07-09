# Preval test case

# assignment_from_string_key2.md

> Normalize > Object > Assignment from string key2
>
> Should convert the key to a regular property

#TODO

## Input

`````js filename=intro
const o = {x: 1};
let y = 1;
if ($(true)) {
  y = o['x'] ;
}
$(y, o);
`````

## Pre Normal

`````js filename=intro
const o = { x: 1 };
let y = 1;
if ($(true)) {
  y = o[`x`];
}
$(y, o);
`````

## Normalized

`````js filename=intro
const o = { x: 1 };
let y = 1;
const tmpIfTest = $(true);
if (tmpIfTest) {
  y = o.x;
} else {
}
$(y, o);
`````

## Output

`````js filename=intro
$(true);
const o = { x: 1 };
$(1, o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
