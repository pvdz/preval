# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = 0 || 2)]);
$(a);
`````


## Settled


`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...2];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: Array spread on non-string primitive must crash (caused by \`const tmpCalleeParam = [...2];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: Array spread on non-string primitive must crash (caused by `const tmpCalleeParam = [...2];`)";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 0;
if (a) {
} else {
  a = 2;
}
const tmpArrSpread = a;
let tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
