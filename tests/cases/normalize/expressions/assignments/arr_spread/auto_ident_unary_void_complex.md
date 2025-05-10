# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = void $(100))]);
$(a);
`````


## Settled


`````js filename=intro
$(100);
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...undefined];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...undefined];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpCalleeParam = [...undefined];`)";
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


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
