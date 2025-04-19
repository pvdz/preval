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
const buf /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `aGVsbG8sIHdvcmxk=`, `base64`);
const tmpMCF$1 /*:unknown*/ = buf.toString;
$dotCall(tmpMCF$1, buf, `toString`, `ascii`);
$(`hello, world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const buf = $dotCall($Buffer_from, Buffer, `from`, `aGVsbG8sIHdvcmxk=`, `base64`);
buf.toString(`ascii`);
$(`hello, world`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $Buffer_from, Buffer, "from", "aGVsbG8sIHdvcmxk=", "base64" );
const b = a.toString;
$dotCall( b, a, "toString", "ascii" );
$( "hello, world" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Buffer_from
- (todo) access object property that also exists on prototype? $buffer_toString


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
