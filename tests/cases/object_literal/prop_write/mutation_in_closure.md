# Preval test case

# mutation_in_closure.md

> Object literal > Prop write > Mutation in closure
>
> When writing to the same obj property multiple times, inline them or remove dupes.

## Input

`````js filename=intro
function f() { 
  $('a');
  x.y = 5;
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
  x.y = 5;
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
  x.y = 5;
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
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`a`);
  x.y = 5;
  $(`b`);
  return undefined;
};
const x /*:object*/ = { y: 0 };
f();
x.y = 10;
f();
$(x);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "a" );
  b.y = 5;
  $( "b" );
  return undefined;
};
const b = { y: 0 };
a();
b.y = 10;
a();
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'a'
 - 4: 'b'
 - 5: { y: '5' }
 - 6: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
