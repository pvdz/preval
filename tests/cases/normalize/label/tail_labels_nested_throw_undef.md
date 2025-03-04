# Preval test case

# tail_labels_nested_throw_undef.md

> Normalize > Label > Tail labels nested throw undef
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
}
f();
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
};
const x = $(true);
const y = $(true);
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`before`);
  $(`inside`);
  return undefined;
};
const x = $(true);
const y = $(true);
f();
`````

## Output


`````js filename=intro
$(true);
$(true);
$(`before`);
$(`inside`);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
$( true );
$( "before" );
$( "inside" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: 'before'
 - 4: 'inside'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
