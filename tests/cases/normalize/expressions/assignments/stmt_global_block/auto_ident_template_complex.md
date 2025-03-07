# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident template complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs /*:string*/ = `foo${tmpBinBothRhs}`;
$(tmpBinLhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo${$(1)}`);
`````

## Pre Normal


`````js filename=intro
let a = `foo` + $coerce($(1), `string`) + ``;
$(a);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = `foo`;
const tmpCalleeParam = $(1);
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let a = $coerce(tmpBinLhs, `plustr`);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `foo${b}`;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
