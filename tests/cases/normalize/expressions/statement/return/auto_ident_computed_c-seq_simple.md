# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (1, 2, $(b))[$("c")];
}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (1, 2, $(b))[$(`c`)];
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpReturnArg = tmpCompObj[tmpCompProp];
  return tmpReturnArg;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpReturnArg = tmpCompObj[tmpCompProp];
$(tmpReturnArg);
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d );
const e = {
  a: 999,
  b: 1000,
};
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
