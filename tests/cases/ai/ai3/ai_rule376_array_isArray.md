# Preval test case

# ai_rule376_array_isArray.md

> Ai > Ai3 > Ai rule376 array isArray
>
> Rule 376: Array.isArray with various inputs

## Input

`````js filename=intro
(function() {
  let actualArray = [1, 2];
  let opaqueIsArray = $('get_arr', ['a', 'b']); // Runtime: "get_arr"
  let opaqueNotArray = $('get_non_arr', 'hello'); // Runtime: "get_non_arr"
  let stringLiteral = 'not_an_array';
  let numLiteral = 123;
  let objLiteral = { a: 1 };
  let nullVal = null;
  let undefinedVal = undefined;

  $('res_actualArray', Array.isArray(actualArray)); // true
  $('res_opaqueIsArray', Array.isArray(opaqueIsArray)); // false (on string "get_arr")
  $('res_opaqueNotArray', Array.isArray(opaqueNotArray)); // false (on string "get_non_arr")
  $('res_stringLiteral', Array.isArray(stringLiteral)); // false
  $('res_numLiteral', Array.isArray(numLiteral)); // false
  $('res_objLiteral', Array.isArray(objLiteral)); // false
  $('res_nullVal', Array.isArray(nullVal)); // false
  $('res_undefinedVal', Array.isArray(undefinedVal)); // false

  // Test with arguments object (array-like, but not an array)
  function testArguments() {
    $('res_arguments', Array.isArray(arguments)); // false
  }
  testArguments(1,2,3);
})();
`````


## Settled


`````js filename=intro
const testArguments /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpCalleeParam /*:boolean*/ = $Array_isArray(tmpPrevalAliasArgumentsAny);
  $(`res_arguments`, tmpCalleeParam);
  return undefined;
};
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`a`, `b`];
const opaqueIsArray /*:unknown*/ = $(`get_arr`, tmpCalleeParam$1);
const opaqueNotArray /*:unknown*/ = $(`get_non_arr`, `hello`);
$(`res_actualArray`, true);
const tmpCalleeParam$5 /*:boolean*/ = $Array_isArray(opaqueIsArray);
$(`res_opaqueIsArray`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:boolean*/ = $Array_isArray(opaqueNotArray);
$(`res_opaqueNotArray`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = $Array_isArray(`not_an_array`);
$(`res_stringLiteral`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:boolean*/ = $Array_isArray(123);
$(`res_numLiteral`, tmpCalleeParam$11);
const objLiteral /*:object*/ /*truthy*/ = { a: 1 };
const tmpCalleeParam$13 /*:boolean*/ = $Array_isArray(objLiteral);
$(`res_objLiteral`, tmpCalleeParam$13);
const tmpCalleeParam$15 /*:boolean*/ = $Array_isArray(null);
$(`res_nullVal`, tmpCalleeParam$15);
const tmpCalleeParam$17 /*:boolean*/ = $Array_isArray(undefined);
$(`res_undefinedVal`, tmpCalleeParam$17);
testArguments(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArguments = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(`res_arguments`, $Array_isArray(tmpPrevalAliasArgumentsAny));
};
const opaqueIsArray = $(`get_arr`, [`a`, `b`]);
const opaqueNotArray = $(`get_non_arr`, `hello`);
$(`res_actualArray`, true);
$(`res_opaqueIsArray`, $Array_isArray(opaqueIsArray));
$(`res_opaqueNotArray`, $Array_isArray(opaqueNotArray));
$(`res_stringLiteral`, $Array_isArray(`not_an_array`));
$(`res_numLiteral`, $Array_isArray(123));
$(`res_objLiteral`, $Array_isArray({ a: 1 }));
$(`res_nullVal`, $Array_isArray(null));
$(`res_undefinedVal`, $Array_isArray(undefined));
testArguments(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $Array_isArray( b );
  $( "res_arguments", d );
  return undefined;
};
const e = [ "a", "b" ];
const f = $( "get_arr", e );
const g = $( "get_non_arr", "hello" );
$( "res_actualArray", true );
const h = $Array_isArray( f );
$( "res_opaqueIsArray", h );
const i = $Array_isArray( g );
$( "res_opaqueNotArray", i );
const j = $Array_isArray( "not_an_array" );
$( "res_stringLiteral", j );
const k = $Array_isArray( 123 );
$( "res_numLiteral", k );
const l = { a: 1 };
const m = $Array_isArray( l );
$( "res_objLiteral", m );
const n = $Array_isArray( null );
$( "res_nullVal", n );
const o = $Array_isArray( undefined );
$( "res_undefinedVal", o );
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let testArguments = function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    const tmpMCF = $Array_isArray;
    let tmpCalleeParam = $Array_isArray(tmpPrevalAliasArgumentsAny);
    $(`res_arguments`, tmpCalleeParam);
    return undefined;
  };
  let actualArray = [1, 2];
  let tmpCalleeParam$1 = [`a`, `b`];
  let opaqueIsArray = $(`get_arr`, tmpCalleeParam$1);
  let opaqueNotArray = $(`get_non_arr`, `hello`);
  let stringLiteral = `not_an_array`;
  let numLiteral = 123;
  let objLiteral = { a: 1 };
  let nullVal = null;
  let undefinedVal = undefined;
  const tmpMCF$1 = $Array_isArray;
  let tmpCalleeParam$3 = $Array_isArray(actualArray);
  $(`res_actualArray`, tmpCalleeParam$3);
  const tmpMCF$3 = $Array_isArray;
  let tmpCalleeParam$5 = $Array_isArray(opaqueIsArray);
  $(`res_opaqueIsArray`, tmpCalleeParam$5);
  const tmpMCF$5 = $Array_isArray;
  let tmpCalleeParam$7 = $Array_isArray(opaqueNotArray);
  $(`res_opaqueNotArray`, tmpCalleeParam$7);
  const tmpMCF$7 = $Array_isArray;
  let tmpCalleeParam$9 = $Array_isArray(stringLiteral);
  $(`res_stringLiteral`, tmpCalleeParam$9);
  const tmpMCF$9 = $Array_isArray;
  let tmpCalleeParam$11 = $Array_isArray(numLiteral);
  $(`res_numLiteral`, tmpCalleeParam$11);
  const tmpMCF$11 = $Array_isArray;
  let tmpCalleeParam$13 = $Array_isArray(objLiteral);
  $(`res_objLiteral`, tmpCalleeParam$13);
  const tmpMCF$13 = $Array_isArray;
  let tmpCalleeParam$15 = $Array_isArray(nullVal);
  $(`res_nullVal`, tmpCalleeParam$15);
  const tmpMCF$15 = $Array_isArray;
  let tmpCalleeParam$17 = $Array_isArray(undefinedVal);
  $(`res_undefinedVal`, tmpCalleeParam$17);
  testArguments(1, 2, 3);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) array reads var statement with init CallExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) type trackeed tricks can possibly support static $Array_isArray


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_arr', ['a', 'b']
 - 2: 'get_non_arr', 'hello'
 - 3: 'res_actualArray', true
 - 4: 'res_opaqueIsArray', false
 - 5: 'res_opaqueNotArray', false
 - 6: 'res_stringLiteral', false
 - 7: 'res_numLiteral', false
 - 8: 'res_objLiteral', false
 - 9: 'res_nullVal', false
 - 10: 'res_undefinedVal', false
 - 11: 'res_arguments', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
