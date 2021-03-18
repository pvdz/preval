# Preval test case

# simple_computed_call.md

> Normalize > Member access > Statement > Func > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj[$('foo')];
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const obj = { foo: 10 };
  obj[$('foo')];
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = $('foo');
  tmpCompObj[tmpCompProp];
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCompProp = $('foo');
obj[tmpCompProp];
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
