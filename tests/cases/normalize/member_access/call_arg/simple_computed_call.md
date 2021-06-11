# Preval test case

# simple_computed_call.md

> Normalize > Member access > Call arg > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj[$('foo')]);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
$(obj[$('foo')]);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCompObj = obj;
const tmpCompProp = $('foo');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCompProp = $('foo');
const obj = { foo: 10 };
const tmpCalleeParam = obj[tmpCompProp];
$(tmpCalleeParam);
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
