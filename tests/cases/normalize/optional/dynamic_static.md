# Preval test case

# dynamic_static.md

> Normalize > Optional > Dynamic static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['foo']);
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
const obj = { foo: 10 };
$(obj?.[`foo`]);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `foo`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
  $(tmpChainElementObject);
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
