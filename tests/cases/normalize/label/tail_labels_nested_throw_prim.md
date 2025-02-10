# Preval test case

# tail_labels_nested_throw_prim.md

> Normalize > Label > Tail labels nested throw prim
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
    if (x) 
      if (y)
        break foo;
  }
  throw xy;
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
    if (x) if (y) break foo;
  }
  throw xy;
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
  foo: {
    $(`inside`);
    if (x) {
      if (y) {
        break foo;
      } else {
      }
    } else {
    }
  }
  throw xy;
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
throw xy;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
const b = $( true );
$( "before" );
const c = a + b;
$( "inside" );
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
