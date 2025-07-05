# Preval test case

# arguments_define_property.md

> Arguments > Ai > Arguments define property
>
> Test Object.defineProperty on arguments

## Input

`````js filename=intro
function testArgsDefineProperty() {
  const originalLength = arguments.length;
  try {
    Object.defineProperty(arguments, 'customProp', {
      value: 'test',
      writable: true,
      enumerable: true,
      configurable: true
    });
    $(arguments.customProp, originalLength);
  } catch (e) {
    $(e.name, originalLength);
  }
}
testArgsDefineProperty(1, 2, 3);
`````


## Settled


`````js filename=intro
const testArgsDefineProperty /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  try {
    const tmpMCP /*:object*/ /*truthy*/ = { value: `test`, writable: true, enumerable: true, configurable: true };
    $Object_defineProperty(tmpPrevalAliasArgumentsAny, `customProp`, tmpMCP);
    const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasArgumentsAny.customProp;
    $(tmpCalleeParam, 3);
  } catch (e) {
    const tmpCalleeParam$3 /*:unknown*/ = e.name;
    $(tmpCalleeParam$3, 3);
  }
  return undefined;
};
testArgsDefineProperty(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsDefineProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  try {
    $Object_defineProperty(tmpPrevalAliasArgumentsAny, `customProp`, {
      value: `test`,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    $(tmpPrevalAliasArgumentsAny.customProp, 3);
  } catch (e) {
    $(e.name, 3);
  }
};
testArgsDefineProperty(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  try {
    const d = {
      value: "test",
      writable: true,
      enumerable: true,
      configurable: true,
    };
    $Object_defineProperty( b, "customProp", d );
    const e = b.customProp;
    $( e, 3 );
  }
  catch (f) {
    const g = f.name;
    $( g, 3 );
  }
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsDefineProperty = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  const originalLength = tmpPrevalAliasArgumentsLen;
  try {
    const tmpMCF = $Object_defineProperty;
    const tmpMCP = { value: `test`, writable: true, enumerable: true, configurable: true };
    $dotCall(tmpMCF, $object_constructor, `defineProperty`, tmpPrevalAliasArgumentsAny, `customProp`, tmpMCP);
    let tmpCalleeParam = tmpPrevalAliasArgumentsAny.customProp;
    let tmpCalleeParam$1 = originalLength;
    $(tmpCalleeParam, originalLength);
  } catch (e) {
    let tmpCalleeParam$3 = e.name;
    let tmpCalleeParam$5 = originalLength;
    $(tmpCalleeParam$3, originalLength);
  }
  return undefined;
};
testArgsDefineProperty(1, 2, 3);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) can try-escaping support this expr node type? ObjectExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $Object_defineProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test', 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
