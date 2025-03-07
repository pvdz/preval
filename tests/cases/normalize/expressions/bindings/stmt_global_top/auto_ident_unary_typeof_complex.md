# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident unary typeof complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = typeof $(arg);
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(typeof tmpUnaryArg, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = typeof $(arg);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
const tmpUnaryArg = $(arg);
let a = typeof tmpUnaryArg;
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
