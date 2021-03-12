# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Var init > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj['fo' + 'o'];
$(x);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
let x = obj['fo' + 'o'];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = 'foo';
let x = tmpCompObj[tmpCompProp];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const x = obj.foo;
$(x);
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
