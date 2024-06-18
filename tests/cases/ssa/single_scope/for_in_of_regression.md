# Preval test case

# for_in_of_regression.md

> Ssa > Single scope > For in of regression
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Pre Normal


`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Normalized


`````js filename=intro
$(undefined);
let x = undefined;
const list = [100];
let arr = undefined;
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## Output


`````js filename=intro
$(undefined);
let x = undefined;
let arr = undefined;
const list = [100];
for (arr of list) {
  x = arr;
  $(x, `for`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
let a = undefined;
let b = undefined;
const c = [ 100 ];
for (b of c) {
  a = b;
  $( a, "for" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 100, 'for'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
