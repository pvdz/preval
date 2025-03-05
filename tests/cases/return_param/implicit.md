# Preval test case

# implicit.md

> Return param > Implicit
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns an implicit global. Can't deal with it.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return foo;
  } else {
    $('b');
    return foo;
  }
}

$(f(1));
$(f(2));
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  if ($(true)) {
    $(`a`);
    return foo;
  } else {
    $(`b`);
    return foo;
  }
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return foo;
  } else {
    $(`b`);
    return foo;
  }
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`a`);
    return foo;
  } else {
    $(`b`);
    return foo;
  }
};
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = f();
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const b = $( true );
  if (b) {
    $( "a" );
    return foo;
  }
  else {
    $( "b" );
    return foo;
  }
};
const c = a();
$( c );
const d = a();
$( d );
const e = a();
$( e );
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: true
 - 5: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
