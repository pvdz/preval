# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Binary right > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = "foo"));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpStringConcatR /*:string*/ = $coerce(tmpBinBothLhs, `plustr`);
const tmpCalleeParam /*:string*/ = `${tmpStringConcatR}foo`;
$(tmpCalleeParam);
$(`foo`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`${$(100)}foo`);
$(`foo`);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = `foo`;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `${b}foo`;
$( c );
$( "foo" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '100foo'
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
