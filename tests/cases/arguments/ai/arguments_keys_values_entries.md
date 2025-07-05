# Preval test case

# arguments_keys_values_entries.md

> Arguments > Ai > Arguments keys values entries
>
> Test Object.keys, values, entries on arguments

## Input

`````js filename=intro
function testArgsKeysValuesEntries() {
  const keys = Object.keys(arguments);
  const values = Object.values(arguments);
  const entries = Object.entries(arguments);
  $(keys, values, entries);
}
testArgsKeysValuesEntries('a', 'b', 'c');
`````


## Settled


`````js filename=intro
const testArgsKeysValuesEntries /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const keys /*:array*/ /*truthy*/ = $Object_keys(tmpPrevalAliasArgumentsAny);
  const values /*:array*/ /*truthy*/ = $Object_values(tmpPrevalAliasArgumentsAny);
  const entries /*:array*/ /*truthy*/ = $Object_entries(tmpPrevalAliasArgumentsAny);
  $(keys, values, entries);
  return undefined;
};
testArgsKeysValuesEntries(`a`, `b`, `c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsKeysValuesEntries = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $($Object_keys(tmpPrevalAliasArgumentsAny), $Object_values(tmpPrevalAliasArgumentsAny), $Object_entries(tmpPrevalAliasArgumentsAny));
};
testArgsKeysValuesEntries(`a`, `b`, `c`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $Object_keys( b );
  const e = $Object_values( b );
  const f = $Object_entries( b );
  $( d, e, f );
  return undefined;
};
a( "a", "b", "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsKeysValuesEntries = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = $Object_keys;
  const keys = $Object_keys(tmpPrevalAliasArgumentsAny);
  const tmpMCF$1 = $Object_values;
  const values = $Object_values(tmpPrevalAliasArgumentsAny);
  const tmpMCF$3 = $Object_entries;
  const entries = $Object_entries(tmpPrevalAliasArgumentsAny);
  $(keys, values, entries);
  return undefined;
};
testArgsKeysValuesEntries(`a`, `b`, `c`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $Object_entries
- (todo) type trackeed tricks can possibly support static $Object_keys
- (todo) type trackeed tricks can possibly support static $Object_values


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  ['0', '1', '2'],
  ['a', 'b', 'c'],
  [
    ['0', 'a'],
    ['1', 'b'],
    ['2', 'c'],
  ],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
