# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
[...++b];
$(a, b);
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
let b = 1;
let a = { a: 999, b: 1000 };
[...++b];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
const tmpArrElToSpread = b;
[...tmpArrElToSpread];
$(a, b);
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
