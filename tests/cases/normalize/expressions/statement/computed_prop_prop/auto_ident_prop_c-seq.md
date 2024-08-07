# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(1, 2, $(b)).c];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
obj[(1, 2, $(b)).c];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompObj$1 = $(b);
const tmpCompProp = tmpCompObj$1.c;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCompObj$1 = $(b);
const tmpCompProp = tmpCompObj$1.c;
obj[tmpCompProp];
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = {};
const d = $( a );
const e = d.c;
c[ e ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
