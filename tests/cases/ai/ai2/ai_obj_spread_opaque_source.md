# Preval test case

# ai_obj_spread_opaque_source.md

> Ai > Ai2 > Ai obj spread opaque source
>
> Test: Object spread with an opaque source.

## Input

`````js filename=intro
// Expected: ({ ...$('source'), b: 2 }); (or equivalent normalized form retaining spread)
let objSource = $('opaque_object_source');
let newObj = {
  a: 1,
  ...objSource,
  b: 2
};
$('result', newObj);
`````


## Settled


`````js filename=intro
const objSource /*:unknown*/ = $(`opaque_object_source`);
const newObj /*:object*/ /*truthy*/ = { a: 1, ...objSource, b: 2 };
$(`result`, newObj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objSource = $(`opaque_object_source`);
$(`result`, { a: 1, ...objSource, b: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_object_source" );
const b = {
  a: 1,
  ... a,
  b: 2,
};
$( "result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let objSource = $(`opaque_object_source`);
let newObj = { a: 1, ...objSource, b: 2 };
$(`result`, newObj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_object_source'
 - 2: 
  'result',
  {
    0: '"o"',
    1: '"p"',
    2: '"a"',
    3: '"q"',
    4: '"u"',
    5: '"e"',
    6: '"_"',
    7: '"o"',
    8: '"b"',
    9: '"j"',
    10: '"e"',
    11: '"c"',
    12: '"t"',
    13: '"_"',
    14: '"s"',
    15: '"o"',
    16: '"u"',
    17: '"r"',
    18: '"c"',
    19: '"e"',
    a: '1',
    b: '2',
  },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
