# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
b[$("c")] && b[$("c")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
b[$(`c`)] && b[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  const tmpCompObj$1 = b;
  const tmpCompProp$1 = $(`c`);
  tmpCompObj$1[tmpCompProp$1];
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpIfTest = b[tmpCompProp];
if (tmpIfTest) {
  const tmpCompProp$1 = $(`c`);
  b[tmpCompProp$1];
} else {
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
if (c) {
  const d = $( "c" );
  b[ d ];
}
const e = {
  a: 999,
  b: 1000,
};
$( e, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
