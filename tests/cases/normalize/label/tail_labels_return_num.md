# Preval test case

# tail_labels_return_num.md

> Normalize > Label > Tail labels return num
>
>

## Input

`````js filename=intro
const x = $(true);
function f() {
  $('before');
  foo: { 
    $('inside'); 
    if (x) $('ok?');
    break foo;
  }
  return 500;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  foo: {
    $(`inside`);
    if (x) $(`ok?`);
    break foo;
  }
  return 500;
};
const x = $(true);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  $(`inside`);
  if (x) {
    $(`ok?`);
    return 500;
  } else {
    return 500;
  }
};
const x = $(true);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = $(true);
$(`before`);
$(`inside`);
if (x) {
  $(`ok?`);
} else {
}
$(500);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
$( "before" );
$( "inside" );
if (a) {
  $( "ok?" );
}
$( 500 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'before'
 - 3: 'inside'
 - 4: 'ok?'
 - 5: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
