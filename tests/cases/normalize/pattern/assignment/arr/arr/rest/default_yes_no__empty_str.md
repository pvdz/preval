# Preval test case

# default_yes_no__empty_str.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default yes no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([[...x] = $('pass')] = '');
$(x);
`````


## Settled


`````js filename=intro
const arrPatternStep /*:unknown*/ = $(`pass`);
const arrPatternSplat$1 /*:array*/ = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arrPatternStep = $(`pass`);
x = [...arrPatternStep].slice(0);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
const b = [ ...a ];
x = b.slice( 0 );
$( x );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read
- (todo) replace with $array_slice
- (todo) type trackeed tricks can possibly support method $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
