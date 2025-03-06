# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > For a > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for ((1, 2, b)[$("c")]; $(0); );
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  (1, 2, b)[$(`c`)];
  while ($(0)) {}
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
tmpCompObj[tmpCompProp];
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
b[tmpCompProp];
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
b[ a ];
const c = $( 0 );
if (c) {
  while ($LOOP_UNROLL_10) {
    const d = $( 0 );
    if (d) {

    }
    else {
      break;
    }
  }
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
 - 2: 0
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- computed property access of an ident where the property ident is not recorded;