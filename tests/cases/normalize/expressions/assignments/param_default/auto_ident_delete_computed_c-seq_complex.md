# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = delete ($(1), $(2), $(arg))[$("y")])) {}
$(f());
$(a, arg);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(undefined);
$(tmpNestedComplexRhs, arg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(undefined);
$(tmpNestedComplexRhs, arg);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = delete ($(1), $(2), $(arg))[$(`y`)]) : tmpParamBare;
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, arg);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
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
$( undefined );
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: undefined
 - 6: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
