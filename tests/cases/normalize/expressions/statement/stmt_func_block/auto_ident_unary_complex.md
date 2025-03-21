# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    typeof $(x);
    $(a, x);
  }
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 999, b: 1000 }, 1);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let x = 1;
    let a = { a: 999, b: 1000 };
    typeof $(x);
    $(a, x);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(x);
  $(a, x);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
