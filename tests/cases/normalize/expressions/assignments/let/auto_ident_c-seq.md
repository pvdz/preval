# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Let > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = ($(1), $(2), $(x)));
$(xyz);
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const a /*:unknown*/ = $(1);
$(a);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const a = $(1);
$(a);
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = (a = ($(1), $(2), $(x)));
$(xyz);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let xyz = a;
$(a);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( a );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
