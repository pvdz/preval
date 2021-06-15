# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Statement > Global > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
obj['fo' + 'o'];
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
obj[`fo` + `o`];
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = `foo`;
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
