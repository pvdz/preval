# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Param default > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
function f(p = (b = 2)) {}
$(f());
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (b = 2) : tmpParamBare;
};
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(f());
$(a, b, c);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    b = 2;
    p = 2;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
const a = {
  a: 999,
  b: 1000,
};
$( a, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
