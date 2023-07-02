# Preval test case

# mutation_without_closure.md

> Object literal > Prop write > Mutation without closure
>
> Counter case to closures, this does the same just without the closure.
> Preval should recognize that x does not escape and ignore the func call.

## Input

`````js filename=intro
function f() { 
  $('a');
  //x.y = 5;
  $('b');
}
const x = {y: 0};
f();
x.y = 10;
f();
$(x);
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`a`);
  $(`b`);
};
const x = { y: 0 };
f();
x.y = 10;
f();
$(x);
$(f);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`a`);
  $(`b`);
  return undefined;
};
const x = { y: 0 };
f();
x.y = 10;
f();
$(x);
$(f);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $(`a`);
  $(`b`);
  return undefined;
};
f();
f();
const x = { y: 10 };
$(x);
$(f);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'a'
 - 4: 'b'
 - 5: { y: '10' }
 - 6: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
