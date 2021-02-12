# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
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
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = $('foo');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
