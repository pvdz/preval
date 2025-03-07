# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Throw > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw $($(1), $(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpThrowArg /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $($(1), $(2));
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
throw $($(1), $(2));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpThrowArg = $(tmpCalleeParam, tmpCalleeParam$1);
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
throw c;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
