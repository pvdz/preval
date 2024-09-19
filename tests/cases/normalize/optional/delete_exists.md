# Preval test case

# delete_exists.md

> Normalize > Optional > Delete exists
>
> Delete on member expression is special casing. Works with optional chaining.

## Input

`````js filename=intro
let o = {x: 1};
$(o);
delete o?.x;
$(o);
`````

## Pre Normal


`````js filename=intro
let o = { x: 1 };
$(o);
delete o?.x;
$(o);
`````

## Normalized


`````js filename=intro
let o = { x: 1 };
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
const o /*:object*/ = { x: 1 };
$(o);
delete o.x;
$(o);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
delete a.x;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
