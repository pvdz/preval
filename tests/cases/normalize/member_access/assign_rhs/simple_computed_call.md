# Preval test case

# dynamic.md

> normalize > member_access > dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
let x = 10;
x = obj[$('foo')];
$(x);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
const tmpAssignRhsCompObj = obj;
const tmpAssignRhsCompProp = $('foo');
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
let x = 10;
const tmpAssignRhsCompObj = obj;
const tmpAssignRhsCompProp = $('foo');
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(x);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
