# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > Return > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (1, 2, $(b)).c;
}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (1, 2, $(b)).c;
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
  const tmpReturnArg = tmpCompObj.c;
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
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpReturnArg = tmpCompObj.c;
$(tmpReturnArg);
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
const c = $( a );
const d = c.c;
$( d );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
