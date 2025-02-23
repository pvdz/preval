# Preval test case

# back-to-back-if-test3.md

> If weaving > Back-to-back-if-test3
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
let x = !$();
if (x) {
  x = true;
  $(`a`);
} else {
  x = false;
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Pre Normal


`````js filename=intro
let x = !$();
if (x) {
  x = true;
  $(`a`);
} else {
  x = false;
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $();
let x = !tmpUnaryArg;
if (x) {
  x = true;
  $(`a`);
} else {
  x = false;
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $();
if (tmpUnaryArg) {
  $(`b`);
} else {
  $(`a`);
}
$(`d`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( "b" );
}
else {
  $( "a" );
}
$( "d" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 'a'
 - 3: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
