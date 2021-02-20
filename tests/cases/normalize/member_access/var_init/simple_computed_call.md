# Preval test case

# simple_computed_call.md

> Normalize > Member access > Var init > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
let x = obj[$('foo')];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = $('foo');
let x = tmpCompObj[tmpCompProp];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCompProp = $('foo');
const x = obj[tmpCompProp];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
