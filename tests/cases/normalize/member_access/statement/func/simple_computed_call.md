# Preval test case

# dynamic.md

> normalize > member_access > dynamic
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

## Normalized

`````js filename=intro
function f() {
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = $('foo');
  tmpCompObj[tmpCompProp];
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = $('foo');
  tmpCompObj[tmpCompProp];
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
