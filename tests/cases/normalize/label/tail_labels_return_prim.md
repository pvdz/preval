# Preval test case

# tail_labels_return_prim.md

> Normalize > Label > Tail labels return prim
>
>

## Input

`````js filename=intro
const x = $(true);
const y = $(true);
function f() {
  $('before');
  const xy = x + y;
  foo: { 
    $('inside');
    if (x) $('ok?');
    break foo;
  }
  return xy;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  const xy = x + y;
  foo: {
    $(`inside`);
    if (x) $(`ok?`);
    break foo;
  }
  return xy;
};
const x = $(true);
const y = $(true);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  const xy = x + y;
  $(`inside`);
  if (x) {
    $(`ok?`);
    return xy;
  } else {
    return xy;
  }
};
const x = $(true);
const y = $(true);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = $(true);
const y = $(true);
$(`before`);
const xy /*:primitive*/ = x + y;
$(`inside`);
if (x) {
  $(`ok?`);
  $(xy);
} else {
  $(xy);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = $( true );
$( "before" );
const c = a + b;
$( "inside" );
if (a) {
  $( "ok?" );
  $( c );
}
else {
  $( c );
}
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
const x = $(true);
const y = $(true);
$(`before`);
const xy = x + y;
$(`inside`);
if (x) {
  $(`ok?`);
  $(xy);
} else {
  $(xy);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - 5: 'ok?'
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
