# Preval test case

# special_prefix.md

> Normalize > Identifier > Explicit shadow implicit > Special prefix
>
> Making sure a binding with my special prefix will still properly work

## Input

`````js filename=intro
{
  const $implicit$foo = $(1);
  $($implicit$foo);
}

$($implicit$foo);
`````


## Settled


`````js filename=intro
const $implicit$foo$1 /*:unknown*/ = $(1);
$($implicit$foo$1);
$($implicit$foo);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1));
$($implicit$foo);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
$( $implicit$foo );
`````


## Globals


BAD@! Found 1 implicit global bindings:

$implicit$foo


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
