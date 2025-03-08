# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = new ($($))(1))} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const a /*:object*/ = new tmpNewCallee(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$([`before `, ` after`], a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = new ($($))(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
const c = [ "before ", " after" ];
$( c, b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: ['before ', ' after'], {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
