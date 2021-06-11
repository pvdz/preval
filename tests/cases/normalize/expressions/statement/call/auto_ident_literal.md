# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Statement > Call > Auto ident literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$("foo");
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$('foo');
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$('foo');
$(a);
`````

## Output

`````js filename=intro
$('foo');
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
