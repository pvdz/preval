# Preval test case

# tail_labels_nested_throw_num.md

> Normalize > Label > Tail labels nested throw num
>
>

## Input

`````js filename=intro
const x = $(true);
const y = $(true);
function f() {
  $('before');
  foo: { 
    $('inside'); 
    if (x) 
      if (y)
        break foo;
  }
  throw 500;
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
    if (x) if (y) break foo;
  }
  throw 500;
};
const x = $(true);
const y = $(true);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  foo: {
    $(`before`);
    $(`inside`);
    if (x) {
      if (y) {
        break foo;
      } else {
      }
    } else {
    }
  }
  throw 500;
};
const x = $(true);
const y = $(true);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
throw 500;
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
$( true );
$( "before" );
$( "inside" );
throw 500;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - eval returned: ('<crash[ 500 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
