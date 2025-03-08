# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)?.[$("x")]));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
  const b /*:object*/ = { x: 1 };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest) {
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`x`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    tmpNestedComplexRhs = tmpChainElementObject;
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall = $({ x: 1 });
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`x`);
    tmpNestedComplexRhs = tmpChainElementCall[tmpChainRootComputed];
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)?.[$(`x`)]));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainRootComputed = $(`x`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpNestedComplexRhs = tmpChainElementObject;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  $( b );
}
else {
  let c = undefined;
  const d = { x: 1 };
  const e = $( d );
  const f = e == null;
  if (f) {

  }
  else {
    const g = $( "x" );
    const h = e[ g ];
    c = h;
  }
  a = c;
  $( c );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
