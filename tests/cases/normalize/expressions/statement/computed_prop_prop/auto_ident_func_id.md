# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[function f() {}];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[
  function f() {
    debugger;
  }
];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const f = function () {
  debugger;
  return undefined;
};
const tmpCompProp = f;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const f = function () {
  debugger;
  return undefined;
};
obj[f];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {};
const c = function() {
  debugger;
  return undefined;
};
b[ c ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
