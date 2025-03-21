# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = void arg)} after`;
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, undefined);
$(undefined, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], undefined);
$(undefined, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = void arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, undefined );
$( undefined, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], undefined
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
