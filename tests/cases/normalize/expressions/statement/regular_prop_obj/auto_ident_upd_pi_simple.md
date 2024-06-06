# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(++b).a;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(++b).a;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
b = b + 1;
let tmpCompObj = b;
tmpCompObj.a;
$(a, b);
`````

## Output


`````js filename=intro
(2).a;
const a = { a: 999, b: 1000 };
$(a, 2);
`````

## PST Output

With rename=true

`````js filename=intro
2.a;
const a = {
a: 999,
b: 1000
;
$( a, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
