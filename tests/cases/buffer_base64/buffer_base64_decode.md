# Preval test case

# buffer_base64_decode.md

> Buffer base64 > Buffer base64 decode
>
> Found in a deobfuscator. With a slightly different payload.

## Input

`````js filename=intro
const decodebase64 = function(arg) {
  const buf = Buffer.from(arg, `base64`);
  const str = buf.toString(`ascii`);
  return str;
};
const x = decodebase64(`aGVsbG8sIHdvcmxk=`);
$(x); // hello, world
`````


## Settled


`````js filename=intro
$(`hello, world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello, world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello, world" );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) type trackeed tricks can possibly support static $Buffer_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello, world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
