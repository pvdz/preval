# Preval test case

# arguments_json_stringify.md

> Arguments > Ai > Arguments json stringify
>
> Test JSON.stringify with arguments

## Input

`````js filename=intro
function testArgsJsonStringify() {
  const stringified = JSON.stringify(arguments);
  const parsed = JSON.parse(stringified);
  $(stringified, parsed);
}
testArgsJsonStringify('string', 42, true, null);
`````


## Settled


`````js filename=intro
const testArgsJsonStringify /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const stringified /*:primitive*/ = $JSON_stringify(tmpPrevalAliasArgumentsAny);
  const parsed /*:unknown*/ = $JSON_parse(stringified);
  $(stringified, parsed);
  return undefined;
};
testArgsJsonStringify(`string`, 42, true, null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsJsonStringify = function () {
  const stringified = $JSON_stringify(arguments);
  $(stringified, $JSON_parse(stringified));
};
testArgsJsonStringify(`string`, 42, true, null);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $JSON_stringify( b );
  const e = $JSON_parse( d );
  $( d, e );
  return undefined;
};
a( "string", 42, true, null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsJsonStringify = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpMCF = $JSON_stringify;
  const stringified = $JSON_stringify(tmpPrevalAliasArgumentsAny);
  const tmpMCF$1 = $JSON_parse;
  const parsed = $JSON_parse(stringified);
  $(stringified, parsed);
  return undefined;
};
testArgsJsonStringify(`string`, 42, true, null);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $JSON_parse
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '{"0":"string","1":42,"2":true,"3":null}', { 0: '"string"', 1: '42', 2: 'true', 3: 'null' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
