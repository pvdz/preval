# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : (1, 2, b)[$("c")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : (1, 2, b)[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
const b = { c: 1 };
if (tmpIfTest) {
  $(100);
} else {
  const tmpCompProp = $(`c`);
  b[tmpCompProp];
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = { c: 1 };
if (a) {
  $( 100 );
}
else {
  const c = $( "c" );
  b[ c ];
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
 - 1: 0
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
