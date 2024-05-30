# Preval test case

# label_mutate_label_no_mutate.md

> Flow > Label mutate label no mutate
>
> The throw may leave the binding mutated anyways

#TODO

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  foo: {
    bar: {
      if ($) {
        x = 'pass';
        break foo;
      } else {
        break bar;
      }
    }
    // Do not consider x mutated here
    $(x);
  }
  // Consider x mutated here
  $(x);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  foo: {
    bar: {
      if ($) {
        x = `pass`;
        break foo;
      } else {
        break bar;
      }
    }
    $(x);
  }
  $(x);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  foo: {
    bar: {
      if ($) {
        x = `pass`;
        break foo;
      } else {
        break bar;
      }
    }
    $(x);
  }
  $(x);
  return undefined;
};
f();
`````

## Output

`````js filename=intro
let x = `fail`;
if ($) {
  x = `pass`;
} else {
  $(x);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = "fail";
if ($) {
  a = "pass";
}
else {
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
