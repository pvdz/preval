# Preval test case

# ai_merge_redundant_nested_blocks.md

> Ai > Ai1 > Ai merge redundant nested blocks
>
> Test: Redundant nested blocks without labels should be merged/flattened.

## Input

`````js filename=intro
// Expected: { $("one"); $("two"); $("three"); $("four"); }
{
  $("one");
  {
    $("two");
    {
      $("three");
    }
  }
  $("four");
}
`````


## Settled


`````js filename=intro
$(`one`);
$(`two`);
$(`three`);
$(`four`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`one`);
$(`two`);
$(`three`);
$(`four`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "one" );
$( "two" );
$( "three" );
$( "four" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`one`);
$(`two`);
$(`three`);
$(`four`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'one'
 - 2: 'two'
 - 3: 'three'
 - 4: 'four'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
