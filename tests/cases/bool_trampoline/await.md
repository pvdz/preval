# Preval test case

# await.md

> Bool trampoline > Await
>
> Don't do this.

This is testing a cloning edge case when it concerns `await`

## Input

`````js filename=intro
async function f(x) {
  x = $(0);
  const y = await x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass'); // Always returns a promise and promises are truthy
else $('fail');
`````

## Pre Normal


`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = await x;
  return y;
};
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
`````

## Normalized


`````js filename=intro
let f = async function ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = await x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const f /*:(unused)=>promise*/ = async function ($$0) {
  debugger;
  const tmpClusterSSA_x /*:unknown*/ = $(0);
  const y /*:unknown*/ = await tmpClusterSSA_x;
  return y;
};
$(f);
$(f);
f();
$(`pass`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = async function($$0 ) {
  debugger;
  const b = $( 0 );
  const c = (await (b));
  return c;
};
$( a );
$( a );
a();
$( "pass" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
