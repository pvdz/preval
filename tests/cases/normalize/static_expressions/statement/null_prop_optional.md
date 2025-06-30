# Preval test case

# null_prop_optional.md

> Normalize > Static expressions > Statement > Null prop optional
>
> Optional property access on null/undefined should drop the remainder of the chain

## Input

`````js filename=intro
$(null?.foo);
$('okay, do not DCE');
`````


## Settled


`````js filename=intro
$(undefined);
$(`okay, do not DCE`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(`okay, do not DCE`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( "okay, do not DCE" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootProp = null;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
  $(tmpChainElementObject);
  $(`okay, do not DCE`);
} else {
  $(tmpCalleeParam);
  $(`okay, do not DCE`);
}
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'okay, do not DCE'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
