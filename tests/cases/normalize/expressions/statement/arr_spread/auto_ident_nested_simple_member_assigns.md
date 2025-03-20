# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Arr spread > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
[...(b.x = b.x = b.x = b.x = b.x = b.x = c)];
$(a, b, c);
`````


## Settled


`````js filename=intro
[...3];
throw `[Preval]: Array spread must crash before this line`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
[...3];
throw `[Preval]: Array spread must crash before this line`;
`````


## PST Settled
With rename=true

`````js filename=intro
[ ...3 ];
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
