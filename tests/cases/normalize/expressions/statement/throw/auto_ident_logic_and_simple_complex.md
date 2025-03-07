# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && $($(1));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpThrowArg /*:unknown*/ = $(tmpCalleeParam);
throw tmpThrowArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = $($(1));
throw tmpThrowArg;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw 1 && $($(1));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg = 1;
if (tmpThrowArg) {
  const tmpCalleeParam = $(1);
  tmpThrowArg = $(tmpCalleeParam);
} else {
}
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
throw b;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
