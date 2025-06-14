# Preval test case

# limit.md

> Unroll loop with true > Limit
>
> Trying to unroll a while loop with `true` as condition.

## Options

- unroll=50

## Input

`````js filename=intro
let str = '';
while (true) {
  str += 'x';
  if (str.length > 30) {
    break;
  }
}
$(str);
`````


## Settled


`````js filename=intro
$(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str = ``;
while (true) {
  const tmpStringConcatR = $coerce(str, `plustr`);
  str = `${tmpStringConcatR}x`;
  const tmpBinLhs = str.length;
  const tmpIfTest = tmpBinLhs > 30;
  if (tmpIfTest) {
    break;
  } else {
  }
}
$(str);
`````


## Todos triggered


- (todo) Support this node type in isFree: TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
