# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    (1, 2, $(b))[$("c")];
}
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    (1, 2, $(b))[$(`c`)];
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
tmpCompObj[tmpCompProp];
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
b[ c ];
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
