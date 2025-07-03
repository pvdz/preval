# Preval test case

# ai_function_call_arg_mismatch_opaque.md

> Ai > Ai2 > Ai function call arg mismatch opaque
>
> Test: Function called with arg/param count mismatch, using opaque values.

## Input

`````js filename=intro
// Expected: JS behavior for undefined params or ignored extra args.
function foo(a, b) {
  $('foo_called_arg_a', a);
  $('foo_called_arg_b', b);
  $('foo_called_arguments_len', arguments.length);
  if (arguments.length > 2) {
    $('foo_called_extra_arg2', arguments[2]);
  }
  return $('foo_return', String(a) + '_' + String(b));
}

foo($('arg_mismatch_1_val', 'one')); // b will be undefined
foo($('arg_mismatch_2_val_a', 'two_a'), $('arg_mismatch_2_val_b', 'two_b'));
foo($('arg_mismatch_3_val_a', 'three_a'), $('arg_mismatch_3_val_b', 'three_b'), $('arg_mismatch_3_val_extra', 'three_extra'));
`````


## Settled


`````js filename=intro
const foo /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  $(`foo_called_arg_a`, a);
  $(`foo_called_arg_b`, b);
  $(`foo_called_arguments_len`, tmpPrevalAliasArgumentsLen);
  const tmpIfTest /*:boolean*/ = tmpPrevalAliasArgumentsLen > 2;
  if (tmpIfTest) {
    const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
    $(`foo_called_extra_arg2`, tmpCalleeParam);
  } else {
  }
  const tmpStringConcatR$1 /*:string*/ = $coerce(a, `string`);
  const tmpBinBothRhs$1 /*:string*/ = $coerce(b, `string`);
  const tmpCalleeParam$1 /*:string*/ /*truthy*/ = `${tmpStringConcatR$1}_${tmpBinBothRhs$1}`;
  $(`foo_return`, tmpCalleeParam$1);
  return undefined;
};
const tmpCalleeParam$3 /*:unknown*/ = $(`arg_mismatch_1_val`, `one`);
foo(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = $(`arg_mismatch_2_val_a`, `two_a`);
const tmpCalleeParam$7 /*:unknown*/ = $(`arg_mismatch_2_val_b`, `two_b`);
foo(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:unknown*/ = $(`arg_mismatch_3_val_a`, `three_a`);
const tmpCalleeParam$11 /*:unknown*/ = $(`arg_mismatch_3_val_b`, `three_b`);
const tmpCalleeParam$13 /*:unknown*/ = $(`arg_mismatch_3_val_extra`, `three_extra`);
foo(tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const foo = function (a, b) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  $(`foo_called_arg_a`, a);
  $(`foo_called_arg_b`, b);
  $(`foo_called_arguments_len`, tmpPrevalAliasArgumentsLen);
  if (tmpPrevalAliasArgumentsLen > 2) {
    $(`foo_called_extra_arg2`, tmpPrevalAliasArgumentsAny[2]);
  }
  const tmpStringConcatR$1 = String(a);
  const tmpBinBothRhs$1 = String(b);
  $(`foo_return`, `${tmpStringConcatR$1}_${tmpBinBothRhs$1}`);
};
foo($(`arg_mismatch_1_val`, `one`));
foo($(`arg_mismatch_2_val_a`, `two_a`), $(`arg_mismatch_2_val_b`, `two_b`));
foo($(`arg_mismatch_3_val_a`, `three_a`), $(`arg_mismatch_3_val_b`, `three_b`), $(`arg_mismatch_3_val_extra`, `three_extra`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = c;
  const d = c.length;
  const e = $$0;
  const f = $$1;
  debugger;
  $( "foo_called_arg_a", e );
  $( "foo_called_arg_b", f );
  $( "foo_called_arguments_len", d );
  const g = d > 2;
  if (g) {
    const h = b[ 2 ];
    $( "foo_called_extra_arg2", h );
  }
  const i = $coerce( e, "string" );
  const j = $coerce( f, "string" );
  const k = `${i}_${j}`;
  $( "foo_return", k );
  return undefined;
};
const l = $( "arg_mismatch_1_val", "one" );
a( l );
const m = $( "arg_mismatch_2_val_a", "two_a" );
const n = $( "arg_mismatch_2_val_b", "two_b" );
a( m, n );
const o = $( "arg_mismatch_3_val_a", "three_a" );
const p = $( "arg_mismatch_3_val_b", "three_b" );
const q = $( "arg_mismatch_3_val_extra", "three_extra" );
a( o, p, q );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = $$0;
  let b = $$1;
  debugger;
  $(`foo_called_arg_a`, a);
  $(`foo_called_arg_b`, b);
  $(`foo_called_arguments_len`, tmpPrevalAliasArgumentsLen);
  const tmpIfTest = tmpPrevalAliasArgumentsLen > 2;
  if (tmpIfTest) {
    let tmpCalleeParam = tmpPrevalAliasArgumentsAny[2];
    $(`foo_called_extra_arg2`, tmpCalleeParam);
  } else {
  }
  const tmpBinLhs = $coerce(a, `string`);
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const tmpBinBothLhs = `${tmpStringConcatR}_`;
  const tmpBinBothRhs = $coerce(b, `string`);
  let tmpCalleeParam$1 = tmpBinBothLhs + tmpBinBothRhs;
  const tmpReturnArg = $(`foo_return`, tmpCalleeParam$1);
  return tmpReturnArg;
};
const tmpCallCallee = foo;
let tmpCalleeParam$3 = $(`arg_mismatch_1_val`, `one`);
foo(tmpCalleeParam$3);
const tmpCallCallee$1 = foo;
let tmpCalleeParam$5 = $(`arg_mismatch_2_val_a`, `two_a`);
let tmpCalleeParam$7 = $(`arg_mismatch_2_val_b`, `two_b`);
foo(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCallCallee$3 = foo;
let tmpCalleeParam$9 = $(`arg_mismatch_3_val_a`, `three_a`);
let tmpCalleeParam$11 = $(`arg_mismatch_3_val_b`, `three_b`);
let tmpCalleeParam$13 = $(`arg_mismatch_3_val_extra`, `three_extra`);
foo(tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) find test case where template ends up with multiple expressions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'arg_mismatch_1_val', 'one'
 - 2: 'foo_called_arg_a', 'arg_mismatch_1_val'
 - 3: 'foo_called_arg_b', undefined
 - 4: 'foo_called_arguments_len', 1
 - 5: 'foo_return', 'arg_mismatch_1_val_undefined'
 - 6: 'arg_mismatch_2_val_a', 'two_a'
 - 7: 'arg_mismatch_2_val_b', 'two_b'
 - 8: 'foo_called_arg_a', 'arg_mismatch_2_val_a'
 - 9: 'foo_called_arg_b', 'arg_mismatch_2_val_b'
 - 10: 'foo_called_arguments_len', 2
 - 11: 'foo_return', 'arg_mismatch_2_val_a_arg_mismatch_2_val_b'
 - 12: 'arg_mismatch_3_val_a', 'three_a'
 - 13: 'arg_mismatch_3_val_b', 'three_b'
 - 14: 'arg_mismatch_3_val_extra', 'three_extra'
 - 15: 'foo_called_arg_a', 'arg_mismatch_3_val_a'
 - 16: 'foo_called_arg_b', 'arg_mismatch_3_val_b'
 - 17: 'foo_called_arguments_len', 3
 - 18: 'foo_called_extra_arg2', 'arg_mismatch_3_val_extra'
 - 19: 'foo_return', 'arg_mismatch_3_val_a_arg_mismatch_3_val_b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
