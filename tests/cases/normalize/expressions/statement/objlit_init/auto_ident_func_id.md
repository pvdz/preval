# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Objlit init > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: function f() {} });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({
  x: function f() {
    debugger;
  },
});
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
