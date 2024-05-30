# Preval test case

# with_elsetail.md

> Ifelse > Label > With elsetail
>
> whoa

#TODO

## Input

`````js filename=intro
function f() {
  foo: {
    if ($(true)) {
      $(100);
      break foo;
    }
    $('else');
  }
  $('after');
}

f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    if ($(true)) {
      $(100);
      break foo;
    }
    $(`else`);
  }
  $(`after`);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  foo: {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(100);
      break foo;
    } else {
      $(`else`);
    }
  }
  $(`after`);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(100);
} else {
  $(`else`);
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 100 );
}
else {
  $( "else" );
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 100
 - 3: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
