# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = "foo")]);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`f`, `o`, `o`];
$(tmpCalleeParam);
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`f`, `o`, `o`]);
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = `foo`)]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "f", "o", "o" ];
$( a );
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['f', 'o', 'o']
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
