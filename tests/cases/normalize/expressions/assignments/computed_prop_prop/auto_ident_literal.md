# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = "foo")];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 'foo')];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = 'foo';
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const obj = {};
obj.foo;
$('foo');
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
