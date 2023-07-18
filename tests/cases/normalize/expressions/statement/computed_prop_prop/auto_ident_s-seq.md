# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[($(1), $(2), x)];
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[($(1), $(2), x)];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
$(1);
$(2);
const tmpCompProp = x;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
$(1);
$(2);
obj[1];
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = {};
$( 1 );
$( 2 );
b[ 1 ];
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
