# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Computed prop prop > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(b = $(2))];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(b = $(2))];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
b = $(2);
let tmpCompProp = b;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const b = $(2);
obj[b];
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {};
const c = $( 2 );
b[ c ];
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
