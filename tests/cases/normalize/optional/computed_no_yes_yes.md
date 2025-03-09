# Preval test case

# computed_no_yes_yes.md

> Normalize > Optional > Computed no yes yes
>
> Mix optional with regular member expressions

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b]?.[c]?.[d]);
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: { d: 10 } } };
const b = `b`,
  c = `c`,
  d = `d`;
$(a[b]?.[c]?.[d]);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const b = `b`;
const c = `c`;
const d = `d`;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpChainRootComputed = b;
const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainRootComputed$1 = c;
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$3 = d;
    const tmpChainElementObject$3 = tmpChainElementObject$1[tmpChainRootComputed$3];
    tmpCalleeParam = tmpChainElementObject$3;
    $(tmpChainElementObject$3);
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
