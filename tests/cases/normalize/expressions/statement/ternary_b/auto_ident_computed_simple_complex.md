# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Ternary b > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(1) ? b[$("c")] : $(200);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(1) ? b[$(`c`)] : $(200);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
} else {
  $(200);
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { c: 1 };
if (tmpIfTest) {
  const tmpCompProp /*:unknown*/ = $(`c`);
  b[tmpCompProp];
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
if (a) {
  const c = $( "c" );
  b[ c ];
}
else {
  $( 200 );
}
const d = {
  a: 999,
  b: 1000,
};
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
