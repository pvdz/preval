# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident call prop simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = b.$(1);
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b.$(1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ $: $ }.$(1));
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = b.$(1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
