# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Tagged > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = {})} after`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = {};
$(tmpCalleeParam, a);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const a = {};
$(tmpCalleeParam, a);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = {}));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
a = {};
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = {};
$( a, b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
