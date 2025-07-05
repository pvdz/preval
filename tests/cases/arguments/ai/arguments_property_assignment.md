# Preval test case

# arguments_property_assignment.md

> Arguments > Ai > Arguments property assignment
>
> Test property assignment on arguments object

## Input

`````js filename=intro
function testArgsPropertyAssignment() {
  arguments.customProp = 'test';
  const value = arguments.customProp;
  $(value);
}
testArgsPropertyAssignment(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsPropertyAssignment /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  tmpPrevalAliasArgumentsAny.customProp = `test`;
  const value /*:unknown*/ = tmpPrevalAliasArgumentsAny.customProp;
  $(value);
  return undefined;
};
testArgsPropertyAssignment(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsPropertyAssignment = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  tmpPrevalAliasArgumentsAny.customProp = `test`;
  $(tmpPrevalAliasArgumentsAny.customProp);
};
testArgsPropertyAssignment(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  b.customProp = "test";
  const d = b.customProp;
  $( d );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsPropertyAssignment = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  tmpPrevalAliasArgumentsAny.customProp = `test`;
  const value = tmpPrevalAliasArgumentsAny.customProp;
  $(value);
  return undefined;
};
testArgsPropertyAssignment(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
