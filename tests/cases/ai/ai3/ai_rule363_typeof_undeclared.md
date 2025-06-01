# Preval test case

# ai_rule363_typeof_undeclared.md

> Ai > Ai3 > Ai rule363 typeof undeclared
>
> Rule 363: typeof on undeclared variable

## Options

- globals: x

## Input

`````js filename=intro
(function() {
  let y = 10;
  // x is undeclared
  let typeX = typeof x;
  $('typeX', typeX);

  if (typeof x === 'undefined') {
    $('x_is_undefined_string');
  } else {
    $('x_is_not_undefined_string', typeof x);
  }

  try {
    $('some_op_with_type_x', typeof x, y);
    $('some_op_with_x_value', x); // This line SHOULD cause a ReferenceError at runtime
  } catch (e) {
    $('error_accessing_x', e.constructor.name);
  }
})();
`````


## Settled


`````js filename=intro
const typeX /*:string*/ = typeof x;
$(`typeX`, typeX);
const tmpBinLhs /*:string*/ = typeof x;
const tmpIfTest /*:boolean*/ = tmpBinLhs === `undefined`;
if (tmpIfTest) {
  $(`x_is_undefined_string`);
} else {
  const tmpCalleeParam /*:string*/ = typeof x;
  $(`x_is_not_undefined_string`, tmpCalleeParam);
}
try {
  const tmpCalleeParam$1 /*:string*/ = typeof x;
  $(`some_op_with_type_x`, tmpCalleeParam$1, 10);
  $(`some_op_with_x_value`, x);
} catch (e) {
  const tmpCompObj /*:unknown*/ = e.constructor;
  const tmpCalleeParam$5 /*:unknown*/ = tmpCompObj.name;
  $(`error_accessing_x`, tmpCalleeParam$5);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`typeX`, typeof x);
if (typeof x === `undefined`) {
  $(`x_is_undefined_string`);
} else {
  $(`x_is_not_undefined_string`, typeof x);
}
try {
  $(`some_op_with_type_x`, typeof x, 10);
  $(`some_op_with_x_value`, x);
} catch (e) {
  $(`error_accessing_x`, e.constructor.name);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = typeof x;
$( "typeX", a );
const b = typeof x;
const c = b === "undefined";
if (c) {
  $( "x_is_undefined_string" );
}
else {
  const d = typeof x;
  $( "x_is_not_undefined_string", d );
}
try {
  const e = typeof x;
  $( "some_op_with_type_x", e, 10 );
  $( "some_op_with_x_value", x );
}
catch (f) {
  const g = f.constructor;
  const h = g.name;
  $( "error_accessing_x", h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let y = 10;
  let typeX = typeof x;
  $(`typeX`, typeX);
  const tmpBinLhs = typeof x;
  const tmpIfTest = tmpBinLhs === `undefined`;
  if (tmpIfTest) {
    $(`x_is_undefined_string`);
  } else {
    let tmpCalleeParam = typeof x;
    $(`x_is_not_undefined_string`, tmpCalleeParam);
  }
  try {
    let tmpCalleeParam$1 = typeof x;
    let tmpCalleeParam$3 = y;
    $(`some_op_with_type_x`, tmpCalleeParam$1, y);
    $(`some_op_with_x_value`, x);
  } catch (e) {
    const tmpCompObj = e.constructor;
    let tmpCalleeParam$5 = tmpCompObj.name;
    $(`error_accessing_x`, tmpCalleeParam$5);
  }
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'typeX', 'undefined'
 - 2: 'x_is_undefined_string'
 - 3: 'some_op_with_type_x', 'undefined', 10
 - 4: 'error_accessing_x', 'ReferenceError'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
