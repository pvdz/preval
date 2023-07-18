# Preval test case

# simple_computed_call.md

> Normalize > Member access > Statement > Global > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
obj[$('foo')];
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
obj[$(`foo`)];
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = $(`foo`);
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro
const tmpCompProp = $(`foo`);
const obj = { foo: 10 };
obj[tmpCompProp];
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
const b = { foo: 10 };
b[ a ];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
