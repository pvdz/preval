# Preval test case

# global_literal.md

> Normalize > Optional > Global literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$('foo'?.length);
`````

## Settled


`````js filename=intro
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````

## Pre Normal


`````js filename=intro
$(`foo`?.length);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = `foo`;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
