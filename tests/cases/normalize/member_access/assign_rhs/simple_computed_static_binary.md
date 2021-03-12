# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Assign rhs > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj['fo' + 'o'];
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
x = obj['fo' + 'o'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
const tmpAssignRhsCompObj = obj;
const tmpAssignRhsCompProp = 'foo';
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const SSA_x = obj.foo;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
