# Preval test case

# multiple_args.md

> Global casting > Boolean > Multiple args
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const b = $('b');
const x = a === b;
const y = Boolean(x, 1, "twee");
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const b /*:unknown*/ = $(`b`);
const x /*:boolean*/ = a === b;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`);
$(a === $(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "b" );
const c = a === b;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const b = $(`b`);
const x = a === b;
const tmpArgOverflow = x;
const y = $boolean_constructor(x);
$(y);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
