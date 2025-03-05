# Preval test case

# tail_labels_nested_return_num.md

> Normalize > Label > Tail labels nested return num
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
    if (x) if (y) break foo;
  }
  return 500;
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
  return 500;
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
$(500);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
$( true );
$( "before" );
$( "inside" );
$( 500 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - 5: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
