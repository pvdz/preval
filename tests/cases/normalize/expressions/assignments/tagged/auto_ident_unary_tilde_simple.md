# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = ~arg)} after`;
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, -2);
$(-2, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], -2);
$(-2, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = ~arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = ~arg;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, -2 );
$( -2, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], -2
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
