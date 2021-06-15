# Preval test case

# simple_computed_call.md

> Normalize > Member access > Assign rhs > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj[$('foo')];
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj[$(`foo`)];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
const tmpAssignRhsCompObj = obj;
const tmpAssignRhsCompProp = $(`foo`);
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````

## Output

`````js filename=intro
const tmpAssignRhsCompProp = $(`foo`);
const obj = { foo: 10 };
const x = obj[tmpAssignRhsCompProp];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
