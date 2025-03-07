# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident delete computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = delete ($(1), $(2), $(arg))[$("y")];
  $(a, arg);
}
$(f());
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const a /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
$(delete tmpDeleteCompObj[tmpDeleteCompProp], arg);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  let a = delete ($(1), $(2), $(arg))[$(`y`)];
  $(a, arg);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
$( d, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: true, {}
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
