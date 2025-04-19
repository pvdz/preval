# Preval test case

# string_arg.md

> Type tracked > String arg
>
> The string arg was not properly picking up the .replace method and figuring out that it always returned a string.
> Most likely because the type wasn't discovered in time and it did not recover once the meta.typing was set.

## Input

`````js filename=intro
const f = function(thisisastring) {
  const regex/*:regex*/ = /[^A-Za-z0-9\+\/\=]/g;
  const str = thisisastring.replace(regex, ``); // string but preval wasnt seeing that
  $(str);
};

const a = f(`a!bc`);
const b = f(`de?f`);
const c = f(`g##h##i`);
$(a, b, c);
`````


## Settled


`````js filename=intro
const f /*:(string)=>undefined*/ = function ($$0) {
  const thisisastring /*:string*/ = $$0;
  debugger;
  const regex /*:regex*/ = /[^A-Za-z0-9\+\/\=]/g;
  const str /*:string*/ = $dotCall($string_replace, thisisastring, `replace`, regex, ``);
  $(str);
  return undefined;
};
f(`a!bc`);
f(`de?f`);
f(`g##h##i`);
$(undefined, undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (thisisastring) {
  $($dotCall($string_replace, thisisastring, `replace`, /[^A-Za-z0-9\+\/\=]/g, ``));
};
f(`a!bc`);
f(`de?f`);
f(`g##h##i`);
$(undefined, undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = /[^A-Za-z0-9\+\/\=]/g;
  const d = $dotCall( $string_replace, b, "replace", c, "" );
  $( d );
  return undefined;
};
a( "a!bc" );
a( "de?f" );
a( "g##h##i" );
$( undefined, undefined, undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc'
 - 2: 'def'
 - 3: 'ghi'
 - 4: undefined, undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
