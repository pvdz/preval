# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Arr spread > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
[...b?.x.y.z];
$(a);
`````


## Settled


`````js filename=intro
[...100];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...100];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...100 ];
throw "[Preval]: Array spread must crash before this line";
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
