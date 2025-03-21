# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = void $(100)).a;
$(a);
`````


## Settled


`````js filename=intro
$(100);
undefined.a;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
undefined.a;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
undefined.a;
throw "[Preval]: Can not reach here";
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
