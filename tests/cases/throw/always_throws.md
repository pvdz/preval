# Preval test case

# always_throws.md

> Throw > Always throws
>
> What should we do with a function that is guaranteed to throw?

I think the call sites should throw unconditionally as well. So the result should have a single throw and the rest is DCE'd.

## Input

`````js filename=intro
const _THROW = function () {
  $('do');
  $('not');
  $('inline');
  $('please');
  // Spoiler: it will be inlined anyways :)
  throw new Error('always throws');
};

$(_THROW())
$(_THROW())
$(_THROW())
$(_THROW())
`````


## Settled


`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(`please`);
const tmpThrowArg /*:object*/ = new Error(`always throws`);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`do`);
$(`not`);
$(`inline`);
$(`please`);
const tmpThrowArg = new Error(`always throws`);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
$( "do" );
$( "not" );
$( "inline" );
$( "please" );
const a = new Error( "always throws" );
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'do'
 - 2: 'not'
 - 3: 'inline'
 - 4: 'please'
 - eval returned: ('<crash[ always throws ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
