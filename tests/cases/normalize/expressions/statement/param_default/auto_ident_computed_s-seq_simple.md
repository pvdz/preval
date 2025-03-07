# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (1, 2, b)[$("c")]) {}
$(f());
$(a, b);
`````

## Settled


`````js filename=intro
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
b[tmpAssignRhsCompProp];
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
b[tmpAssignRhsCompProp];
$(undefined);
$({ a: 999, b: 1000 }, b);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (1, 2, b)[$(`c`)] : tmpParamBare;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $(`c`);
    p = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
b[ a ];
$( undefined );
const c = {
  a: 999,
  b: 1000,
};
$( c, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: undefined
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
