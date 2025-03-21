# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = (1, 2, $(b))[$("c")];
  $(a, b);
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`c`);
const a /*:unknown*/ = tmpCompObj[tmpCompProp];
$(a, b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
$(tmpCompObj[tmpCompProp], b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = (1, 2, $(b))[$(`c`)];
  $(a, b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  let a = tmpCompObj[tmpCompProp];
  $(a, b);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
$( d, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1, { c: '1' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
