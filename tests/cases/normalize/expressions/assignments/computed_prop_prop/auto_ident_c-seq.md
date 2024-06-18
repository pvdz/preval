# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = ($(1), $(2), $(x)))];
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = ($(1), $(2), $(x)))];
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
a = $(x);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
const a = $(1);
const obj = {};
obj[a];
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = {};
b[ a ];
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
