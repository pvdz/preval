# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident c-opt simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$([...(a = b?.["x"])]);
$(a);
`````

## Settled


`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([...(a = b?.[`x`])]);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `x`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...1 ];
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
