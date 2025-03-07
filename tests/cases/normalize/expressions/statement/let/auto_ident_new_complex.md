# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Let > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = new ($($))(1);
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const xyz /*:object*/ = new tmpNewCallee(1);
$(xyz);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
$(new tmpNewCallee(1));
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = new ($($))(1);
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
let xyz = new tmpNewCallee(1);
$(xyz);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
