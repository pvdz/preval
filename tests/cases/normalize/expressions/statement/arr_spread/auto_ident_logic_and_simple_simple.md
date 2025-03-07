# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && 2)];
$(a);
`````

## Settled


`````js filename=intro
[...2];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...2];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...(1 && 2)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = 1;
if (tmpArrElToSpread) {
  tmpArrElToSpread = 2;
} else {
}
[...tmpArrElToSpread];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...2 ];
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
