# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Arr spread > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
[...($(1), $(2), x)];
$(a, x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...1];\`)`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
throw `Preval: Array spread on non-string primitive must crash (caused by \`[...1];\`)`;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw "Preval: Array spread on non-string primitive must crash (caused by `[...1];`)";
`````


## Todos triggered


None


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
