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

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = $('foo');
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCompProp = $('foo');
obj[tmpCompProp];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
