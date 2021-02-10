# Preval test case

# dynamic.md

> normalize > member_access > dynamic
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
