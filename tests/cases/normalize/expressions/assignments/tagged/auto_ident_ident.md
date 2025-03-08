# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Tagged > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = b)} after`;
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 1);
$(1, 1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = b;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 1 );
$( 1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
