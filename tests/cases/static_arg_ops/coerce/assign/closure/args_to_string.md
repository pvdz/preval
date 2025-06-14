# Preval test case

# args_to_string.md

> Static arg ops > Coerce > Assign > Closure > Args to string

(this is a test case)

Coercing arguments always results in `[object Arguments]` and is in itself
not observable. Probably an edge case (red herring in obfuscation?).

## Input

`````js filename=intro
let x = $('50');
const f = function (c, d) {
  $($coerce(arguments, 'string'));
  $(1);
  $(2);
  $(d);
};
f(3);
f(4);
`````


## Settled


`````js filename=intro
$(`50`);
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`[object Arguments]`);
  $(1);
  $(2);
  $(undefined);
  return undefined;
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`50`);
const f = function () {
  $(`[object Arguments]`);
  $(1);
  $(2);
  $(undefined);
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
$( "50" );
const a = function() {
  debugger;
  $( "[object Arguments]" );
  $( 1 );
  $( 2 );
  $( undefined );
  return undefined;
};
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`50`);
const f = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  let c = $$0;
  let d = $$1;
  debugger;
  let tmpCalleeParam = $coerce(tmpPrevalAliasArgumentsAny, `string`);
  $(tmpCalleeParam);
  $(1);
  $(2);
  $(d);
  return undefined;
};
f(3);
f(4);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '50'
 - 2: '[object Arguments]'
 - 3: 1
 - 4: 2
 - 5: undefined
 - 6: '[object Arguments]'
 - 7: 1
 - 8: 2
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
