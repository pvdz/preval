# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...void $(100)];
$(a);
`````


## Settled


`````js filename=intro
$(100);
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
[ ...undefined ];
throw "[Preval]: Array spread must crash before this line";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
