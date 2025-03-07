# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident call ident complex args
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = $($(1), $(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
$($(tmpCalleeParam, $(2)));
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = $($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
