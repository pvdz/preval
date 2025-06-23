# Preval test case

# unroll_option_enough.md

> Unwind loops > Counter test > Unroll option enough
>
> Should be able to raise the amount of loop unrolls

The loop should now be unrolled properly

## Options

- unroll=30

## Input

`````js filename=intro
let counter = 20;
while (counter) {
  $('test ' + counter)
  counter = counter - 1;
}
`````


## Settled


`````js filename=intro
$(`test 20`);
$(`test 19`);
$(`test 18`);
$(`test 17`);
$(`test 16`);
$(`test 15`);
$(`test 14`);
$(`test 13`);
$(`test 12`);
$(`test 11`);
$(`test 10`);
$(`test 9`);
$(`test 8`);
$(`test 7`);
$(`test 6`);
$(`test 5`);
$(`test 4`);
$(`test 3`);
$(`test 2`);
$(`test 1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`test 20`);
$(`test 19`);
$(`test 18`);
$(`test 17`);
$(`test 16`);
$(`test 15`);
$(`test 14`);
$(`test 13`);
$(`test 12`);
$(`test 11`);
$(`test 10`);
$(`test 9`);
$(`test 8`);
$(`test 7`);
$(`test 6`);
$(`test 5`);
$(`test 4`);
$(`test 3`);
$(`test 2`);
$(`test 1`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "test 20" );
$( "test 19" );
$( "test 18" );
$( "test 17" );
$( "test 16" );
$( "test 15" );
$( "test 14" );
$( "test 13" );
$( "test 12" );
$( "test 11" );
$( "test 10" );
$( "test 9" );
$( "test 8" );
$( "test 7" );
$( "test 6" );
$( "test 5" );
$( "test 4" );
$( "test 3" );
$( "test 2" );
$( "test 1" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let counter = 20;
while (true) {
  if (counter) {
    const tmpStringConcatL = $coerce(counter, `plustr`);
    let tmpCalleeParam = `test ${tmpStringConcatL}`;
    $(tmpCalleeParam);
    counter = counter - 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test 20'
 - 2: 'test 19'
 - 3: 'test 18'
 - 4: 'test 17'
 - 5: 'test 16'
 - 6: 'test 15'
 - 7: 'test 14'
 - 8: 'test 13'
 - 9: 'test 12'
 - 10: 'test 11'
 - 11: 'test 10'
 - 12: 'test 9'
 - 13: 'test 8'
 - 14: 'test 7'
 - 15: 'test 6'
 - 16: 'test 5'
 - 17: 'test 4'
 - 18: 'test 3'
 - 19: 'test 2'
 - 20: 'test 1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
