# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Statement > Call spread > Auto ident prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(1, 2, b).c);
$(a, b);
`````

## Settled


`````js filename=intro
$(...1);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { c: 1 };
$(a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...1);
$({ a: 999, b: 1000 }, { c: 1 });
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(...(1, 2, b).c);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCalleeParamSpread = tmpCompObj.c;
$(...tmpCalleeParamSpread);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( ...1 );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
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
