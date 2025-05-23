# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$([...(a = ($(1), $(2), x))]);
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...1];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...1];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpCalleeParam = [...1];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x;
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
