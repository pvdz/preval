# Preval test case

# _base_prop_obj.md

> Normalize > Nullish > Base prop obj
>
> Simple example

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
let tmpCalleeParam = f;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = x;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:object*/ = { x: 10 };
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 10 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
