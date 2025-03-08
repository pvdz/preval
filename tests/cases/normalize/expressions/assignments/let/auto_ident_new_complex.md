# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Let > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = new ($($))(1));
$(xyz);
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ = new tmpNewCallee(1);
$(a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$(a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = new ($($))(1));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let xyz = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
$( b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
